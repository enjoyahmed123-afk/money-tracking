import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getErrorMessage } from "../api/error.api";
import {
    getAccounts,
    createAccount,
    adjustAccountBalance,
    toggleAccountArchive,
    transferBetweenAccounts,
} from "../api/accounts.api";

export const fetchAccounts = createAsyncThunk(
    "account/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getAccounts();
            return res.data.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

export const addAccount = createAsyncThunk(
    "account/add",
    async (data, { rejectWithValue }) => {
        try {
            const res = await createAccount(data);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

export const adjustBalance = createAsyncThunk(
    "account/adjustBalance",
    async ({ id, newBalance, notes }, { rejectWithValue }) => {
        try {
            const res = await adjustAccountBalance(id, { newBalance, notes });
            return res.data.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

export const toggleArchive = createAsyncThunk(
    "account/toggleArchive",
    async (id, { rejectWithValue }) => {
        try {
            const res = await toggleAccountArchive(id);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

export const transferFunds = createAsyncThunk(
    "account/transfer",
    async ({ fromId, toId, amount, description }, { rejectWithValue }) => {
        try {
            const res = await transferBetweenAccounts({ fromId, toId, amount, description });
            return res.data.data; // { from, to }
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

const initialState = {
    items: [],
    status: "idle",
    error: null,
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccounts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAccounts.fulfilled, (state, action) => {
                state.status = "success";
                state.items = action.payload;
            })
            .addCase(fetchAccounts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            .addCase(addAccount.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(addAccount.fulfilled, (state, action) => {
                state.status = "success";
                state.items.push(action.payload);
            })
            .addCase(addAccount.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            .addCase(adjustBalance.fulfilled, (state, action) => {
                const idx = state.items.findIndex((a) => a._id === action.payload._id);
                if (idx !== -1) state.items[idx] = action.payload;
            })
            .addCase(adjustBalance.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(toggleArchive.fulfilled, (state, action) => {
                const idx = state.items.findIndex((a) => a._id === action.payload._id);
                if (idx !== -1) state.items[idx] = action.payload;
            })
            .addCase(toggleArchive.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(transferFunds.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(transferFunds.fulfilled, (state, action) => {
                state.status = "success";
                const { from, to } = action.payload;
                for (const acc of [from, to]) {
                    const idx = state.items.findIndex((a) => a._id === acc._id);
                    if (idx !== -1) state.items[idx] = acc;
                }
            })
            .addCase(transferFunds.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default accountSlice.reducer;
