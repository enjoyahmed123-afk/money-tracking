import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getErrorMessage } from "../api/error.api";
import {
    getExpenseCategories,
    createExpenseCategory,
    updateExpenseCategory,
    deleteExpenseCategory,
} from "../api/expenseCategories.api";

export const fetchExpenseCategories = createAsyncThunk(
    "expenseCategory/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getExpenseCategories();
            return res.data.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

export const addExpenseCategory = createAsyncThunk(
    "expenseCategory/add",
    async (data, { rejectWithValue }) => {
        try {
            const res = await createExpenseCategory(data);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

export const editExpenseCategory = createAsyncThunk(
    "expenseCategory/edit",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await updateExpenseCategory(id, data);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

export const removeExpenseCategory = createAsyncThunk(
    "expenseCategory/remove",
    async (id, { rejectWithValue }) => {
        try {
            await deleteExpenseCategory(id);
            return id;
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

const expenseCategorySlice = createSlice({
    name: "expenseCategory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExpenseCategories.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchExpenseCategories.fulfilled, (state, action) => {
                state.status = "success";
                state.items = action.payload;
            })
            .addCase(fetchExpenseCategories.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            .addCase(addExpenseCategory.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(addExpenseCategory.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(editExpenseCategory.fulfilled, (state, action) => {
                const idx = state.items.findIndex((c) => c._id === action.payload._id);
                if (idx !== -1) state.items[idx] = action.payload;
            })
            .addCase(editExpenseCategory.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(removeExpenseCategory.fulfilled, (state, action) => {
                state.items = state.items.filter((c) => c._id !== action.payload);
            })
            .addCase(removeExpenseCategory.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default expenseCategorySlice.reducer;
