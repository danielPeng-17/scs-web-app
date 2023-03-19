import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
    loading: false
};

const DBMSlice = createSlice({
    name: 'dbm',
    initialState,
    reducers: {
        queryAction: (draft, _payload) => {
            draft.loading = true;
        },
        querySuccessAction: (draft, payload) => {
            draft.data = payload.data;
            draft.loading = false;
        },
        queryFailAction: (draft) => {
            draft.data = null;
            draft.loading = false;
        }
    } 
});

export const {
    queryAction,
    querySuccessAction,
    queryFailAction
} = DBMSlice.actions;

export default DBMSlice.reducer;
