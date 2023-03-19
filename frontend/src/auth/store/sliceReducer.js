import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        telNo: '',
        address: '',
        city: '',
        province: '',
        country: '',
        postalCode: '',
        balance: 0
    },
    isLoggedIn: false,
    isAdmin: false,
    logInErrors: [],
    loading: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signUpAction: (draft, _payload) => {
            draft.loading = true;
        },
        signUpSuccessAction: (draft, payload) => {
            const { payload: data } = payload;

            draft.user.id = data.id;
            draft.user.email = data.email;
            draft.user.firstName = data.firstName;
            draft.user.lastName = data.lastName;
            draft.user.telNo = data.telNo;
            draft.user.address = data.address;
            draft.user.city = data.city;
            draft.user.province = data.province;
            draft.user.country = data.country;
            draft.user.postalCode = data.postalCode;
            draft.isLoggedIn = data.isLoggedIn;
            draft.isAdmin = data.isAdmin;
            draft.loading = false;
        },
        signUpFailAction: (draft) => {
            draft.user = {...initialState.user};
            draft.isLoggedIn = false;
            draft.isAdmin = false;
            draft.logInErrors = [];
        },
        signInAction: (draft, _payload) => {
            draft.loading = true;
            draft.logInErrors = [];
        },
        signInSuccessAction: (draft, payload) => {
            const { payload: data } = payload;

            draft.user.id = data.id;
            draft.user.email = data.email;
            draft.user.firstName = data.firstName;
            draft.user.lastName = data.lastName;
            draft.user.telNo = data.telNo;
            draft.user.address = data.address;
            draft.user.city = data.city;
            draft.user.province = data.province;
            draft.user.country = data.country;
            draft.user.postalCode = data.postalCode;
            draft.isLoggedIn = data.isLoggedIn;
            draft.isAdmin = data.isAdmin;
            draft.logInErrors = [];
            draft.loading = false;
        },
        signInFailAction: (draft, payload) => {
            const { payload: data } = payload;

            draft.user = {...initialState.user};
            draft.isLoggedIn = data.isLoggedIn;
            draft.isAdmin = data.isAdmin;
            draft.logInErrors = data.logInErrors;
            draft.loading = false;
        },
        logOutAction: (draft) => {
            draft.user = {...initialState.user};
            draft.isLoggedIn = false;
            draft.isAdmin = false;
            draft.logInErrors = [];
        }
    }
});

export const {
    signUpAction,
    signUpSuccessAction,
    signUpFailAction,
    signInAction,
    signInSuccessAction,
    signInFailAction,
    logOutAction
} = authSlice.actions;

export default authSlice.reducer;