import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
    loading: false
};

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState, 
    reducers: {
        checkoutAction: (draft, _payload) => {
            draft.loading = true;
        },
        checkoutSuccessAction: (draft, payload) => {
            draft.loading = false;
            draft.data = payload.data;
        },
        checkoutFailAction: (draft) => {
            draft.loading = false;
            draft.data = null;
        },
    }
});

export const {
    checkoutAction,
    checkoutSuccessAction,
    checkoutFailAction,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;

