import api from "./axios.api";

export const getAccounts = () => api.get("/accounts");
export const createAccount = (data) => api.post("/accounts", data);
export const updateAccount = (id, data) => api.put(`/accounts/${id}`, data);
export const adjustAccountBalance = (id, data) =>
  api.post(`/accounts/${id}/adjust`, data);
export const toggleAccountArchive = (id) =>
  api.patch(`/accounts/${id}/archive`);
export const getAccountTransactions = (id, params) =>
  api.get(`/accounts/${id}/transactions`, { params });
export const transferBetweenAccounts = (data) =>
  api.post("/accounts/transfer", data);
