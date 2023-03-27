import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    toast: false
}

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setToast: (draft, action) => {
            draft.toast = action.payload;
        }
    }
});

export const {
    setToast
} = toastSlice.actions;

export default toastSlice.reducer;