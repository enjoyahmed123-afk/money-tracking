import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getErrorMessage } from "../api/error.api";
import { register, login, getMe, forgotPassword, resetPassword } from '../api/auth.api';

export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ email, password, rememberMe }, { rejectWithValue }) => {
        try {
            const res = await login(email, password, rememberMe);
            return res.data.data;

        } catch (error) {
            // نبعث رسالة الخطأ النصية التي ترجعها الدالة getErrorMessage
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/register",
    async ({ name, email, password }, { rejectWithValue }) => {
        try {
            const res = await register(name, email, password);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

export const featchMe = createAsyncThunk(
    "auth/me",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getMe();
            return res.data.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

export const forgotPasswordUser = createAsyncThunk(
    "auth/forgotPassword",
    async (email, { rejectWithValue }) => {
        try {
            const res = await forgotPassword(email);
            return res.data.message;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

export const resetPasswordUser = createAsyncThunk(
    "auth/resetPassword",
    async ({ token, password }, { rejectWithValue }) => {
        try {
            const res = await resetPassword(token, password);
            return res.data.message;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

const initialState = {
    user: null,
    initializing: Boolean(localStorage.getItem("token")),
    status: "idle", // 'idle' | 'loading' | 'success' | 'failed'
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        cleareError(state) {
            state.error = null;
        },
        logout(state) {
            localStorage.removeItem("token");
            state.user = null;
            state.status = "idle";
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // --- Register ---
            .addCase(registerUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = "success";
                state.user = action.payload.user || null;
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload; // يحتوي على رسالة الخطأ النصية
            })

            // --- Login ---
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "success";
                state.user = action.payload.user || null;
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload; // يحتوي على رسالة الخطأ النصية
            })

            // --- Fetch Me ---
            .addCase(featchMe.pending, (state) => {
                state.initializing = true;
            })
            .addCase(featchMe.fulfilled, (state, action) => {
                state.initializing = false;
                state.user = action.payload;
            })
            .addCase(featchMe.rejected, (state) => {
                state.initializing = false;
                state.user = null;
                localStorage.removeItem("token");
            })

            // --- Forgot Password ---
            .addCase(forgotPasswordUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(forgotPasswordUser.fulfilled, (state) => {
                state.status = "success";
            })
            .addCase(forgotPasswordUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // --- Reset Password ---
            .addCase(resetPasswordUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(resetPasswordUser.fulfilled, (state) => {
                state.status = "success";
            })
            .addCase(resetPasswordUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    }
});

export const { cleareError, logout } = authSlice.actions;
export default authSlice.reducer;