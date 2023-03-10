
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: [],
    loading: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getCartAction: (draft, _payload) => {
            draft.loading = true;
        },
        getCartSuccessAction: (draft, payload) => {
            draft.items = payload.items;
            draft.loading = false;
        },
        getCartFailAction: (draft, _payload) => {
            draft.items = [];
            draft.loading = false;
        }
    }
});

export const {
    getCartAction,
    getCartFailAction,
    getCartSuccessAction
} = cartSlice.actions;

export default cartSlice.reducer;
