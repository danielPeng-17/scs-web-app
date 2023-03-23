import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCartAction: (draft, action) => {
            const { id, quantity } = action.payload;
            const numQuantity = Number(quantity ?? 0);
            const index = draft.items.findIndex((item) => item.id === id);

            if (numQuantity > 0) {
                if (index !== -1) {
                    draft.items[index].quantity += numQuantity;
                } else {
                    draft.items.push({ id, quantity: numQuantity });
                }
            }
        },
        updateCartItemAction: (draft, action) => {
            const { id, quantity } = action.payload;
            const index = draft.items.findIndex((item) => item.id === id);

            if (index !== -1 && quantity > 0) {
                draft.items[index].quantity = quantity;
            }
        },
        removeCartItemAction: (draft, action) => {
            const { id } = action.payload;

            draft.items = draft.items.filter((item) => item.id !== id);
        },
        updateTotalPrice: (draft, action) => {
            draft.totalPrice = action.payload.total;
        },
        clearCartAction: (draft) => {
            draft.items = [];
            draft.totalPrice = 0;
        }
    },
});

export const {
    addCartAction,
    updateCartItemAction,
    removeCartItemAction,
    updateTotalPrice,
    clearCartAction
} = cartSlice.actions;

export default cartSlice.reducer;
