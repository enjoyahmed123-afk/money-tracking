function errorHandler(err, req, res, next) {
  console.error(err.stack);

  // Mongoose/MongoDB errors never set `.status` — map the common ones to the
  // right HTTP code instead of falling through to a raw 500.
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).json({ success: false, message: err.message });
  }
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern ?? {}).join(", ") || "field";
    return res.status(409).json({ success: false, message: `Duplicate value for: ${field}` });
  }

  const status = err.status ?? 500;
  res.status(status).json({
    success: false,
    message: err.message ?? "Internal Server Error",
  });
}

module.exports = errorHandler;
