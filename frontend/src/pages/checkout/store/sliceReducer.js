import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    success: false,
    data: null,
    errorMessage: null,
    errorCode: null,
    loading: false
};

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState, 
    reducers: {
        checkoutAction: (draft, _payload) => {
            draft.loading = true;
        },
        checkoutSuccessAction: (draft, action) => {
            const {sucess, ...data} = action.payload;

            draft.loading = false;
            draft.data = data;
            draft.success = sucess;
            draft.errorMessage = null;
            draft.errorCode = null;
        },
        checkoutFailAction: (draft, action) => {
            draft.loading = false;
            draft.data = null;
            draft.errorMessage = action.payload.errorMessage;
            draft.errorCode = action.payload.errorCode;
        },
    }
});

export const {
    checkoutAction,
    checkoutSuccessAction,
    checkoutFailAction,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;

