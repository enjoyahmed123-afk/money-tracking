import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getErrorMessage } from "../api/error.api";
import { getExpenses, createExpense, updateExpense, deleteExpense } from "../api/expenses.api";

export const fetchExpenses = createAsyncThunk(
    "expense/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getExpenses();
            return res.data.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

export const addExpense = createAsyncThunk(
    "expense/add",
    async (data, { rejectWithValue }) => {
        try {
            const res = await createExpense(data);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

export const editExpense = createAsyncThunk(
    "expense/edit",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await updateExpense(id, data);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

export const removeExpense = createAsyncThunk(
    "expense/remove",
    async (id, { rejectWithValue }) => {
        try {
            await deleteExpense(id);
            return id;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

const initialState = {
    items: [],
    status: "idle", // 'idle' | 'loading' | 'success' | 'failed'
    error: null,
};

const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {
        clearExpenseError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExpenses.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchExpenses.fulfilled, (state, action) => {
                state.status = "success";
                state.items = action.payload;
            })
            .addCase(fetchExpenses.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            .addCase(addExpense.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.status = "success";
                state.items.unshift(action.payload);
            })
            .addCase(addExpense.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            .addCase(editExpense.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(editExpense.fulfilled, (state, action) => {
                state.status = "success";
                const idx = state.items.findIndex((e) => e._id === action.payload._id);
                if (idx !== -1) state.items[idx] = action.payload;
            })
            .addCase(editExpense.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            .addCase(removeExpense.fulfilled, (state, action) => {
                state.items = state.items.filter((e) => e._id !== action.payload);
            })
            .addCase(removeExpense.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearExpenseError } = expenseSlice.actions;
export default expenseSlice.reducer;
