const Account            = require("../models/Account");
const AccountTransaction = require("../models/AccountTransaction");
const User               = require("../models/User");

/* ── helpers ─────────────────────────────────────── */
// Records a debit/credit against an account the caller owns.
// Throws { status, message } — callers already funnel errors through next(err),
// and errorHandler duck-types on those two fields.
async function recordTxn(userId, accountId, type, amount, description, date, relatedModel, relatedId, notes) {
  const delta = type === "debit" ? -amount : amount;

  // Ownership + archived-state are enforced atomically in the filter itself,
  // and the balance change is applied with $inc — both close the race window
  // where two concurrent requests could read the same stale balance.
  const updated = await Account.findOneAndUpdate(
    { _id: accountId, user: userId, isActive: true },
    { $inc: { balance: delta } },
    { new: true }
  );

  if (!updated) {
    const exists = await Account.findOne({ _id: accountId, user: userId });
    if (!exists) throw { status: 404, message: "Account not found." };
    throw { status: 400, message: "Cannot record a transaction on an archived account." };
  }

  const balanceAfter  = updated.balance;
  const balanceBefore = balanceAfter - delta;
  const insufficientBalance = type === "debit" && balanceBefore < amount;

  await AccountTransaction.create({
    user: userId, account: accountId, type, amount,
    description, balanceBefore, balanceAfter,
    date, relatedModel: relatedModel || null, relatedId: relatedId || null, notes,
  });

  return { account: updated, insufficientBalance };
}

// Reverse a previously recorded transaction linked to a related doc
async function reverseTxn(userId, relatedModel, relatedId) {
  const txn = await AccountTransaction.findOne({ user: userId, relatedModel, relatedId });
  if (!txn) return;
  const delta = txn.type === "debit" ? txn.amount : txn.type === "credit" ? -txn.amount : 0;
  if (delta !== 0) {
    await Account.findOneAndUpdate({ _id: txn.account, user: userId }, { $inc: { balance: delta } });
  }
  await txn.deleteOne();
}

/* ── exports ─────────────────────────────────────── */
// GET /api/accounts
exports.list = async (req, res, next) => {
  try {
    const accounts = await Account.find({ user: req.userId }).sort({ createdAt: 1 });
    res.json({ success: true, data: accounts });
  } catch (err) { next(err); }
};

// POST /api/accounts
exports.create = async (req, res, next) => {
  try {
    const { name, type, balance, currency, color } = req.body;
    if (!name?.trim()) return res.status(400).json({ success: false, message: "Account name is required." });

    const user = await User.findById(req.userId).lean();
    if (user?.subscriptionType === "trial") {
      const count = await Account.countDocuments({ user: req.userId });
      if (count >= 1) {
        return res.status(403).json({ success: false, code: "TRIAL_LIMIT_1_ACCOUNT", message: "Only 1 account is allowed in trial mode." });
      }
    }

    const exists = await Account.findOne({ user: req.userId, name: name.trim() });
    if (exists) return res.status(400).json({ success: false, message: "An account with this name already exists." });

    const initialBalance = parseFloat(balance) || 0;
    const account = await Account.create({
      user: req.userId,
      name: name.trim(), type,
      balance: initialBalance,
      currency: currency || "EGP",
      color: color || "#0d9488",
    });

    if (initialBalance !== 0) {
      await AccountTransaction.create({
        user: req.userId, account: account._id,
        type: initialBalance > 0 ? "credit" : "debit",
        amount: Math.abs(initialBalance),
        description: "Initial balance",
        balanceBefore: 0, balanceAfter: initialBalance,
        date: new Date(),
      });
    }

    res.status(201).json({ success: true, data: account });
  } catch (err) { next(err); }
};

// PUT /api/accounts/:id  (name / type / currency / color only — balance via /adjust)
exports.update = async (req, res, next) => {
  try {
    const { name, type, currency, color } = req.body;

    if (name) {
      const dup = await Account.findOne({ user: req.userId, name: name.trim(), _id: { $ne: req.params.id } });
      if (dup) return res.status(400).json({ success: false, message: "An account with this name already exists." });
    }

    const update = {};
    if (name)     update.name     = name.trim();
    if (type)     update.type     = type;
    if (currency) update.currency = currency;
    if (color)    update.color    = color;

    const account = await Account.findOneAndUpdate(
      { _id: req.params.id, user: req.userId }, update, { new: true, runValidators: true }
    );
    if (!account) return res.status(404).json({ success: false, message: "Account not found" });
    res.json({ success: true, data: account });
  } catch (err) { next(err); }
};

// DELETE /api/accounts/:id
exports.remove = async (req, res, next) => {
  try {
    const account = await Account.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!account) return res.status(404).json({ success: false, message: "Account not found" });
    await AccountTransaction.deleteMany({ account: req.params.id });
    res.json({ success: true, message: "Account deleted" });
  } catch (err) { next(err); }
};

// POST /api/accounts/:id/adjust
exports.adjustBalance = async (req, res, next) => {
  try {
    const { newBalance, notes } = req.body;
    if (newBalance === undefined || newBalance === null)
      return res.status(400).json({ success: false, message: "newBalance is required." });

    const account = await Account.findOne({ _id: req.params.id, user: req.userId });
    if (!account) return res.status(404).json({ success: false, message: "Account not found" });
    if (!account.isActive) return res.status(400).json({ success: false, message: "Cannot adjust the balance of an archived account." });

    const balanceBefore = account.balance;
    const balanceAfter  = parseFloat(newBalance);
    const diff = Math.abs(balanceAfter - balanceBefore);

    account.balance = balanceAfter;
    await account.save();

    await AccountTransaction.create({
      user: req.userId, account: account._id,
      type: "adjustment", amount: diff,
      description: "Manual balance adjustment",
      balanceBefore, balanceAfter,
      date: new Date(), notes: notes || undefined,
    });

    res.json({ success: true, data: account });
  } catch (err) { next(err); }
};

// PATCH /api/accounts/:id/archive
exports.toggleArchive = async (req, res, next) => {
  try {
    const account = await Account.findOne({ _id: req.params.id, user: req.userId });
    if (!account) return res.status(404).json({ success: false, message: "Account not found" });
    account.isActive = !account.isActive;
    await account.save();
    res.json({ success: true, data: account });
  } catch (err) { next(err); }
};

// GET /api/accounts/activity  (recent transactions across all user accounts)
exports.recentActivity = async (req, res, next) => {
  try {
    const ids = (await Account.find({ user: req.userId }).select("_id")).map((a) => a._id);
    const txns = await AccountTransaction.find({ account: { $in: ids } })
      .populate("account", "name type color currency")
      .sort({ date: -1 })
      .limit(parseInt(req.query.limit) || 30);
    res.json({ success: true, data: txns });
  } catch (err) { next(err); }
};

// GET /api/accounts/:id/transactions
exports.getTransactions = async (req, res, next) => {
  try {
    const filter = { account: req.params.id, user: req.userId };
    const { start, end } = req.query;
    if (start || end) {
      filter.date = {};
      if (start) filter.date.$gte = new Date(start);
      if (end)   filter.date.$lte = new Date(end);
    }
    const txns = await AccountTransaction.find(filter).sort({ date: -1 });
    res.json({ success: true, data: txns });
  } catch (err) { next(err); }
};

// POST /api/accounts/transfer  { fromId, toId, amount, description }
// Used for ATM withdrawal: bank → cash, or any internal transfer
exports.transfer = async (req, res, next) => {
  try {
    const { fromId, toId, amount, description } = req.body;
    const amt = parseFloat(amount);
    if (!fromId || !toId) return res.status(400).json({ success: false, message: "fromId and toId are required." });
    if (!amt || amt <= 0) return res.status(400).json({ success: false, message: "Amount must be positive." });

    const [from, to] = await Promise.all([
      Account.findOne({ _id: fromId, user: req.userId }),
      Account.findOne({ _id: toId,   user: req.userId }),
    ]);
    if (!from) return res.status(404).json({ success: false, message: "Source account not found." });
    if (!to)   return res.status(404).json({ success: false, message: "Destination account not found." });
    if (from.balance < amt)
      return res.status(400).json({
        success: false,
        message: `الرصيد غير كافٍ — الرصيد الحالي في "${from.name}" هو ${from.balance.toFixed(2)} ${from.currency}.`,
      });

    const label = description || "Internal Transfer";
    const now   = new Date();

    // Debit from source
    const fromBefore = from.balance;
    from.balance -= amt;
    await from.save();
    await AccountTransaction.create({
      user: req.userId, account: from._id,
      type: "debit", amount: amt,
      description: label,
      balanceBefore: fromBefore, balanceAfter: from.balance, date: now,
    });

    // Credit to destination
    const toBefore = to.balance;
    to.balance += amt;
    await to.save();
    await AccountTransaction.create({
      user: req.userId, account: to._id,
      type: "credit", amount: amt,
      description: label,
      balanceBefore: toBefore, balanceAfter: to.balance, date: now,
    });

    res.json({ success: true, data: { from, to } });
  } catch (err) { next(err); }
};

/* ── used by expense / income controllers ─────────── */
exports.recordTxn   = recordTxn;
exports.reverseTxn  = reverseTxn;
