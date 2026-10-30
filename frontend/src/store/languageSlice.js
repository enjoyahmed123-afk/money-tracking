import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { saveLocale } from "../api/settings.api";

function storedLocale() {
    try {
        return localStorage.getItem("locale") || "en";
    } catch {
        return "en";
    }
}

export const changeLocale = createAsyncThunk(
    "language/change",
    async (locale, { rejectWithValue }) => {
        try {
            // Best-effort sync to the backend; the toggle itself must never
            // depend on this (works the same logged in or on the auth pages).
            if (localStorage.getItem("token")) {
                await saveLocale(locale);
            }
        } catch {
            // Ignore — local switch already happened, this is just persistence.
        }
        return locale;
    }
);

const initialState = {
    locale: storedLocale(),
};

const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(changeLocale.fulfilled, (state, action) => {
            state.locale = action.payload;
            try {
                localStorage.setItem("locale", action.payload);
            } catch {
                // ignore
            }
        });
    },
});

export default languageSlice.reducer;
