# MoneyFlow — Personal Finance Tracker (Frontend)

A UI-only React + Tailwind CSS build of the MoneyFlow personal finance tracker, covering every module from the product's user stories: Authentication, Income, Expenses, Categories, Accounts, Cash Tracker, Transactions, Debts, Savings Goals, Reports, Settings, Subscription, and an Admin console.

This build contains **presentation only** — no state management, no form submission logic, and no API integration. It is intended as a pixel-ready hand-off for a developer to wire up real data.

## Tech Stack

- **React 19** + **React Router DOM 7**
- **Tailwind CSS 3** — utility-first styling exclusively, dark "Teal / Indigo" glassmorphism theme
- **react-icons** (Feather icon set) for all iconography
- **Recharts** for all charts (cash flow, category breakdown, revenue, churn, funnels, etc.)
- **Vite** for tooling

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:3000`.

> Note: `tailwindcss`, `react-icons`, and `recharts` are declared in `package.json` but need `npm install` (with network access) to be fetched before the app can build.

## Project Structure

```
src/
  api/           # Placeholder API modules (one per feature), ready for real HTTP calls
  components/
    ui/          # Design-system primitives: Button, Card, Modal, Input, Table, etc.
    common/      # Shared composite components: PageHeader, EmptyState, Pagination, etc.
  config/        # App-wide constants/config placeholders
  contexts/      # (none yet — add Auth/Subscription contexts here when wiring up logic)
  features/      # One folder per domain module (auth, dashboard, income, expenses,
                 # expenseCategories, accounts, cash, transactions, debts, savings,
                 # reports, settings, subscription, admin), each with components/ and pages/
  hooks/         # Placeholder custom hooks
  layouts/       # MainLayout (app shell + sidebar/topbar), AuthLayout, AdminLayout
  routes/        # React Router route table + guard components (pass-through for now)
  services/      # Placeholder services (notifications, token storage, error handling)
  styles/        # Tailwind entry (global.css)
  utils/         # Placeholder formatting/validation helpers
```

## What's Implemented

- Every page and route listed in the product's user stories, including a new **Cash Tracker**
  module (`/cash`) with a sidebar entry.
- A reusable, English-only, dark-glassmorphism design system.
- User profile dropdown with settings links and a logout button in the top bar.
- Interactive (but logic-free) charts, tabs, modals, and dropdowns using local component state
  only for UI presentation (no persistence, no data fetching).

## What's Intentionally Left Out (for the next developer)

- Authentication, form validation, and submission handling
- API calls / data fetching (`api/*.js` files are stubs)
- Real auth/subscription guards (`routes/*.jsx` guards currently just render their children)
- Internationalization — this build is English-only by design
