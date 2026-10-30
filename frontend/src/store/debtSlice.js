
// اللى ذاكرتة -------------------------------------------------------
import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import { getErrorMessage } from "../api/error.api";
import {
    getDebts ,
    createDebt ,
    updateDebt ,
    deleteDebt ,
    markDebtPaid ,
    addDebtPayment
} from "../api/debts.api";

// هنا جلب كل الديون من السيرفر و تخزينها في الستيت
export const fetchDebts = createAsyncThunk(
    "debt/fetchAll" ,
    async (_, { rejectWithValue}) => {
        try {
            const res = await getDebts();
            return res.data.data;
        }catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }

    }

)

// هنا اضافة دين جديد و تخزينه في الستيت
export const addDebt = createAsyncThunk(
    "debt/add" ,
    async (data , { rejectWithValue}) => {
        try {
            const res = await createDebt(data);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
)

// هنا تعديل دين موجود و تخزينه في الستيت
export const editDebt = createAsyncThunk(
    "debt/edit" ,
    async ({id , data} , {rejectWithValue}) => {
        try {
            const res = await updateDebt(id , data);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
)
// هنا حذف دين موجود و تخزينه في الستيت
export const removeDebt = createAsyncThunk(
    "debt/remove" ,
    async (id , {rejectWithValue}) => {
        try {
            await deleteDebt(id);
            return id;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
)

// هنا وضع علامة على الدين بأنه تم سداده و تخزينه في الستيت
export const markPaid = createAsyncThunk(
    "debt/markPaid" ,
    async (id , {rejectWithValue}) => {
        try {
            const res = await markDebtPaid(id);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
)

// هنا اضافة دفعة على الدين و تخزينها في الستيت
export const addPayment = createAsyncThunk(
    "debt/addPayment" ,
    async ({id , data} , {rejectWithValue}) => {
        try {
            const res = await addDebtPayment(id , data);
            return res.data.data; // { debt , payment }
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
)

const initialState = {
    items : [] ,
    status : "idle" ,
    error : null
}

// هنا انشاء Slice
const debtSlice = createSlice({
    name : "debt" ,
    initialState ,
    reducers : {} ,
    extraReducers : (builder) => {
        builder
            .addCase(fetchDebts.pending , (state) => {
                state.status = "loading";
            })
            .addCase(fetchDebts.fulfilled , (state , action) =>{
                state.status = "success";
                state.items = action.payload;
            })
            .addCase(fetchDebts.rejected , (state , action) => {
                state.status = "failed";
                state.error = action.payload;
            })


            .addCase(addDebt.pending , (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(addDebt.fulfilled , (state , action) => {
                state.status = "success";
                state.items.unshift(action.payload);
            })
            .addCase(addDebt.rejected , (state , action) => {
                state.status = "failed";
                state.error = action.payload;
            })



            .addCase(editDebt.fulfilled , (state , action) => {
                const idx = state.items.findIndex(
                    (d) => d._id === action.payload._id
                );
                if (idx !== -1) state.items[idx] = action.payload;
            })
            .addCase(editDebt.rejected , (state , action) => {
                state.error = action.payload;
            })


            .addCase(removeDebt.fulfilled , (state , action) => {
                state.items = state.items.filter(
                    (d) => d._id !== action.payload
                );
            })
            .addCase(removeDebt.rejected , (state , action) => {
                state.error = action.payload;
            })


            .addCase(markPaid.fulfilled , (state , action) => {
                const idx = state.items.findIndex(
                    (d) => d._id === action.payload._id
                );
                if (idx !== -1) state.items[idx] = action.payload;
            })
            .addCase(markPaid.rejected , (state , action) => {
                state.error = action.payload;
            })


            .addCase(addPayment.fulfilled , (state , action) => {
                const idx = state.items.findIndex(
                    (d) => d._id === action.payload.debt._id
                );
                if (idx !== -1) state.items[idx] = action.payload.debt;
            })
            .addCase(addPayment.rejected , (state , action) => {
                state.error = action.payload;
            })
    }
})

export default debtSlice.reducer;