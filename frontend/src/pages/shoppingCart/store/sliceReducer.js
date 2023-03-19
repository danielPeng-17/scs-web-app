
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartAction: (draft, action) => {
            const { id, quantity } = action.payload;
            const index = draft.items.findIndex(item => item.id === id);
            if (index !== -1) {
                draft.items[index].quantity += quantity;
            } else {
                draft.items.push(action.payload)
            }
        },
    }
});

export const {
    addCartAction
} = cartSlice.actions;

export default cartSlice.reducer;
