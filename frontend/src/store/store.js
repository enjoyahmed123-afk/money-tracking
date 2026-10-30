import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./accountSlice";
import authSlice from "./authSlice";
import debtSlice from "./debtSlice";
import expenseCategorySlice from "./expenseCategorySlice";
import expenseSlice from "./expenseSlice";
import incomeSlice from "./incomeSlice";
import languageSlice from "./languageSlice";
import themeSlice from "./themeSlice";

export const store = configureStore({
  reducer: {
    account: accountSlice,
    auth: authSlice,
    debt: debtSlice,
    expense: expenseSlice,
    expenseCategory: expenseCategorySlice,
    income: incomeSlice,
    language: languageSlice,
    theme: themeSlice,
  },
});
