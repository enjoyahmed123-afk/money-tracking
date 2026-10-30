import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createIncome,
  deleteIncome,
  getIncome,
  getIncomeSummary,
  updateIncome,
} from "../api/income.api";
import { getErrorMessage } from "../api/error.api";

const request = async (callback, rejectWithValue) => {
  try {
    return (await callback()).data.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
};

export const fetchIncomes = createAsyncThunk(
  "income/fetchAll",
  (_, { rejectWithValue }) => request(getIncome, rejectWithValue)
);
export const fetchIncome = fetchIncomes;

export const fetchIncomeSummary = createAsyncThunk(
  "income/fetchSummary",
  (months, { rejectWithValue }) =>
    request(() => getIncomeSummary(months), rejectWithValue)
);

export const addIncome = createAsyncThunk(
  "income/add",
  (data, { rejectWithValue }) =>
    request(() => createIncome(data), rejectWithValue)
);

export const editIncome = createAsyncThunk(
  "income/edit",
  ({ id, data }, { rejectWithValue }) =>
    request(() => updateIncome(id, data), rejectWithValue)
);

export const removeIncome = createAsyncThunk(
  "income/remove",
  async (id, { rejectWithValue }) => {
    try {
      await deleteIncome(id);
      return id;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const initialState = { items: [], summary: [], status: "idle", error: null };
const setPending = (state) => {
  state.status = "loading";
  state.error = null;
};
const setRejected = (state, action) => {
  state.status = "failed";
  state.error = action.payload;
};

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    clearIncomeError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomes.pending, setPending)
      .addCase(fetchIncomes.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(fetchIncomes.rejected, setRejected)
      .addCase(fetchIncomeSummary.fulfilled, (state, action) => {
        state.summary = action.payload;
      })
      .addCase(addIncome.pending, setPending)
      .addCase(addIncome.fulfilled, (state, action) => {
        state.status = "success";
        state.items.unshift(action.payload);
      })
      .addCase(addIncome.rejected, setRejected)
      .addCase(editIncome.pending, setPending)
      .addCase(editIncome.fulfilled, (state, action) => {
        state.status = "success";
        const index = state.items.findIndex(
          (income) => income._id === action.payload._id
        );
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(editIncome.rejected, setRejected)
      .addCase(removeIncome.pending, setPending)
      .addCase(removeIncome.fulfilled, (state, action) => {
        state.status = "success";
        state.items = state.items.filter(
          (income) => income._id !== action.payload
        );
      })
      .addCase(removeIncome.rejected, setRejected);
  },
});

export const { clearIncomeError } = incomeSlice.actions;
export default incomeSlice.reducer;
