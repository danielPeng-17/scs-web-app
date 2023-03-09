import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        telNo: '',
        address: ''
    },
    isLoggedIn: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signUpAction: (_draft, _payload) => {},
        signUpSuccessAction: (draft, payload) => {
            draft.user.id = payload.id;
            draft.user.email = payload.email;
            draft.user.firstName = payload.firstName;
            draft.user.lastName = payload.lastName;
            draft.user.telNo = payload.telNo;
            draft.user.address = payload.address;
            draft.isLoggedIn = true;
        },
        signUpFailAction: (draft) => {
            draft = {...initialState};
        }
    }
});

export const {
    signUpAction,
    signUpSuccessAction,
    signUpFailAction
} = authSlice.actions;

export default authSlice.reducer;