import api from "./axios.api";

export const register = (name, email, password) => {
    return api.post("/auth/register", { name, email, password })
}

export const login = (email, password, rememberMe) => {
    return api.post("/auth/login", { email, password, rememberMe })
}

export const getMe = () => api.get("/auth/me")

export const forgotPassword = (email) => {
    return api.post("/auth/forgot-password", { email })
}

export const resetPassword = (token, password) => {
    return api.post("/auth/reset-password", { token, password })
}

