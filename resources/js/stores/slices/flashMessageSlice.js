import { createSlice } from "@reduxjs/toolkit";

const flashMessageSlice = createSlice({
    name: "flashMessage",
    initialState: null,
    reducers: {
        setFlashMessage: (state, action) => action.payload,
        clearFlashMessage: () => null
    }
});

export const { setFlashMessage, clearFlashMessage } = flashMessageSlice.actions;

export default flashMessageSlice.reducer;