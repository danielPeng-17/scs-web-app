import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    response: null,
    loading: false
};

const DBMSlice = createSlice({
    name: 'dbm',
    initialState,
    reducers: {
        queryAction: (draft, _payload) => {
            draft.loading = true;
        },
        querySuccessAction: (draft, action) => {
            draft.response = action.payload;
            draft.loading = false;
        },
        queryFailAction: (draft) => {
            draft.response = null;
            draft.loading = false;
        },
        clearResponseAction: (draft) => {
            draft.response = null;
        }
    } 
});

export const {
    queryAction,
    querySuccessAction,
    queryFailAction,
    clearResponseAction,
} = DBMSlice.actions;

export default DBMSlice.reducer;
