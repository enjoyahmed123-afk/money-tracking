// import api from "./axios.api";

// export const getDebts = () => api.get("/debts");

// export const getDebt = (id) => api.get(`/debts/${id}`);

// export const createDebt = (data) => api.post("/debts", data);

// export const updateDebt = (id, data) => api.put(`/debts/${id}`, data);

// export const deleteDebt = (id) => api.delete(`/debts/${id}`);

// export const markDebtPaid = (id) => api.patch(`/debts/${id}/paid`);

// export const getDebtPayments = (id) => api.get(`/debts/${id}/payments`);

// export const addDebtPayment = (id, data) => api.post(`/debts/${id}/payments`, data);

// api.METHOD(URL, DATA)
//الكود كله تقريبًا مبني على قاعدة واحدة:

import api from "./axios.api";
export const getDebts = () => api.get("/debts");
export const getDebt = (id) => api.get(`/debts/${id}`);
export const createDebt = (data) => api.post("/debts", data);
export const updateDebt = (id, data) => api.put(`/debts/${id}`, data);
export const deleteDebt = (id) => api.delete(`/debts/${id}`);
export const markDebtPaid = (id) => api.patch(`/debts/${id}/paid`);
export const getDebtPayments = (id) => api.get(`/debts/${id}/payments`);
export const addDebtPayment = (id, data) => api.post(`/debts/${id}/payments`, data);
