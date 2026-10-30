import { Routes, Route, Navigate } from "react-router-dom";

import GuestRoute from "@/routes/GuestRoute.jsx";
import ProtectedRoute from "@/routes/ProtectedRoute.jsx";
import AdminRoute from "@/routes/AdminRoute.jsx";
import SubscriptionGuard from "@/routes/SubscriptionGuard.jsx";

import AuthLayout from "@/layouts/AuthLayout/AuthLayout.jsx";
import MainLayout from "@/layouts/MainLayout/MainLayout.jsx";
import AdminLayout from "@/layouts/AdminLayout/AdminLayout.jsx";

import LoginPage from "@/features/auth/pages/LoginPage.jsx";
import RegisterPage from "@/features/auth/pages/RegisterPage.jsx";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage.jsx";

import DashboardPage from "@/features/dashboard/pages/DashboardPage.jsx";
import IncomePage from "@/features/income/pages/IncomePage.jsx";
import ExpensesPage from "@/features/expenses/pages/ExpensesPage.jsx";
import ExpenseCategoriesPage from "@/features/expenseCategories/pages/ExpenseCategoriesPage.jsx";
import AccountsPage from "@/features/accounts/pages/AccountsPage.jsx";
import AccountDetailsPage from "@/features/accounts/pages/AccountDetailsPage.jsx";
import CashTrackerPage from "@/features/cash/pages/CashTrackerPage.jsx";
import TransactionsPage from "@/features/transactions/pages/TransactionsPage.jsx";
import DebtsPage from "@/features/debts/pages/DebtsPage.jsx";
import DebtDetailsPage from "@/features/debts/pages/DebtDetailsPage.jsx";
import SavingsPage from "@/features/savings/pages/SavingsPage.jsx";

import ReportsHomePage from "@/features/reports/pages/ReportsHomePage.jsx";
import IncomeExpensesReportPage from "@/features/reports/pages/IncomeExpensesReportPage.jsx";
import CategoryBreakdownPage from "@/features/reports/pages/CategoryBreakdownPage.jsx";
import CashFlowReportPage from "@/features/reports/pages/CashFlowReportPage.jsx";
import SavingsRatePage from "@/features/reports/pages/SavingsRatePage.jsx";
import NetWorthReportPage from "@/features/reports/pages/NetWorthReportPage.jsx";
import DebtsReportPage from "@/features/reports/pages/DebtsReportPage.jsx";
import HabitsReportPage from "@/features/reports/pages/HabitsReportPage.jsx";

import ProfileSettingsPage from "@/features/settings/pages/ProfileSettingsPage.jsx";
import SecuritySettingsPage from "@/features/settings/pages/SecuritySettingsPage.jsx";
import AppearanceSettingsPage from "@/features/settings/pages/AppearanceSettingsPage.jsx";

import SubscriptionPage from "@/features/subscription/pages/SubscriptionPage.jsx";

import AdminLoginPage from "@/features/admin/pages/AdminLoginPage.jsx";
import AdminDashboardPage from "@/features/admin/pages/AdminDashboardPage.jsx";
import AdminUsersPage from "@/features/admin/pages/AdminUsersPage.jsx";
import AdminUserDetailsPage from "@/features/admin/pages/AdminUserDetailsPage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public / auth screens */}
      <Route element={<GuestRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
        </Route>
      </Route>

      {/* User application */}
      <Route path="/" element={<ProtectedRoute />}>
        <Route element={<SubscriptionGuard />}>
          <Route element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="income" element={<IncomePage />} />
            <Route path="expenses" element={<ExpensesPage />} />
            <Route path="expense-categories" element={<ExpenseCategoriesPage />} />
            <Route path="accounts" element={<AccountsPage />} />
            <Route path="accounts/:id" element={<AccountDetailsPage />} />
            <Route path="cash" element={<CashTrackerPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="debts" element={<DebtsPage />} />
            <Route path="debts/:id" element={<DebtDetailsPage />} />
            <Route path="savings" element={<SavingsPage />} />

            <Route path="reports" element={<ReportsHomePage />} />
            <Route path="reports/income-expenses" element={<IncomeExpensesReportPage />} />
            <Route path="reports/categories" element={<CategoryBreakdownPage />} />
            <Route path="reports/cash-flow" element={<CashFlowReportPage />} />
            <Route path="reports/savings-rate" element={<SavingsRatePage />} />
            <Route path="reports/net-worth" element={<NetWorthReportPage />} />
            <Route path="reports/debts" element={<DebtsReportPage />} />
            <Route path="reports/habits" element={<HabitsReportPage />} />

            <Route path="settings" element={<Navigate to="/settings/profile" replace />} />
            <Route path="settings/profile" element={<ProfileSettingsPage />} />
            <Route path="settings/security" element={<SecuritySettingsPage />} />
            <Route path="settings/appearance" element={<AppearanceSettingsPage />} />

            <Route path="subscription" element={<SubscriptionPage />} />
          </Route>
        </Route>
      </Route>

      {/* Admin panel */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="users/:id" element={<AdminUserDetailsPage />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}