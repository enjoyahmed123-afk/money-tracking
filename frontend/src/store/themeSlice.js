import { createSlice } from "@reduxjs/toolkit";

// Same resolution order as the inline script in index.html:
// saved choice -> OS preference -> dark.
function initialTheme() {
    try {
        const saved = localStorage.getItem("theme");
        if (saved === "light" || saved === "dark") return saved;
        if (window.matchMedia?.("(prefers-color-scheme: light)").matches) return "light";
    } catch {
        // ignore
    }
    return "dark";
}

const themeSlice = createSlice({
    name: "theme",
    initialState: { mode: initialTheme() },
    reducers: {
        setTheme(state, action) {
            state.mode = action.payload;
            try {
                localStorage.setItem("theme", action.payload);
            } catch {
                // ignore
            }
        },
        toggleTheme(state) {
            state.mode = state.mode === "dark" ? "light" : "dark";
            try {
                localStorage.setItem("theme", state.mode);
            } catch {
                // ignore
            }
        },
    },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
