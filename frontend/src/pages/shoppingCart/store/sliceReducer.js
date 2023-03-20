
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: [],
    totalPrice: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartAction: (draft, action) => {
            const { id, quantity } = action.payload;
            const numQuantity = Number(quantity);
            const index = draft.items.findIndex(item => item.id === id);
            if (index !== -1) {
                draft.items[index].quantity += numQuantity;
            } else {
                draft.items.push({ id, quantity: numQuantity })
            }
        },
        updateTotalPrice: (draft, action) => {
            draft.totalPrice = action.payload.total;
        }
    }
});

export const {
    addCartAction,
    updateTotalPrice
} = cartSlice.actions;

export default cartSlice.reducer;
