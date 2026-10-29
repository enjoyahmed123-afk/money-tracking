import client from "./client";

export const listAccounts = () => client.get("/accounts").then((r) => r.data.data);
export const createAccount = (data) => client.post("/accounts", data).then((r) => r.data.data);
export const updateAccount = (id, data) => client.put(`/accounts/${id}`, data).then((r) => r.data.data);
export const removeAccount = (id) => client.delete(`/accounts/${id}`).then((r) => r.data);
export const adjustBalance = (id, data) => client.post(`/accounts/${id}/adjust`, data).then((r) => r.data.data);
export const toggleArchive = (id) => client.patch(`/accounts/${id}/archive`).then((r) => r.data.data);
export const getAccountTransactions = (id, params) =>
  client.get(`/accounts/${id}/transactions`, { params }).then((r) => r.data.data);
