import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    success: false,
    data: null,
    trucks: null,
    errorMessage: null,
    errorCode: null,
    loading: false,
};

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        checkoutAction: (draft, _action) => {
            draft.loading = true;
        },
        checkoutSuccessAction: (draft, action) => {
            const { success, ...data } = action.payload;

            draft.loading = false;
            draft.data = data;
            draft.success = success;
            draft.errorMessage = null;
            draft.errorCode = null;
        },
        checkoutFailAction: (draft, action) => {
            draft.loading = false;
            draft.data = null;
            draft.success = action.payload.success;
            draft.errorMessage = action.payload.errorMessage;
            draft.errorCode = action.payload.errorCode;
        },
        fetchTruckAction: (draft) => {
            draft.loading = true;
        },
        fetchTruckSuccessAction: (draft, action) => {
            draft.loading = false;
            draft.trucks = action.payload;
        },
        fetchTruckFailAction: (draft) => {
            draft.loading = false;
            draft.trucks = null;
        },
    },
});

export const {
    checkoutAction,
    checkoutSuccessAction,
    checkoutFailAction,
    fetchTruckAction,
    fetchTruckSuccessAction,
    fetchTruckFailAction,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
