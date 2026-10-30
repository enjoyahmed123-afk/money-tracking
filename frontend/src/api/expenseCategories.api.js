import api from "./axios.api";

export const getExpenseCategories = () => api.get("/expense-categories");

export const createExpenseCategory = (data) => api.post("/expense-categories", data);

export const updateExpenseCategory = (id, data) => api.put(`/expense-categories/${id}`, data);

export const deleteExpenseCategory = (id) => api.delete(`/expense-categories/${id}`);
