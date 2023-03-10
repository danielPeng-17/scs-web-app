import { all, call, put, takeLatest } from "redux-saga/effects";
import { getCartAction } from "../../pages/shoppingCart/store/sliceReducer";
import { postSignIn, postSignUp } from '../../services';
import {
    signUpAction,
    signUpFailAction,
    signUpSuccessAction,
    signInAction,
    signInSuccessAction,
    signInFailAction
} from "./sliceReducer";

function* signUpSaga(action) {
    try {
        const res = yield call(postSignUp, action.payload);

        if (res) {
            // TODO: res.data is not final backend response; update when backend is ready
            yield put(signUpSuccessAction(res.data));
        }
    } catch (e) {
        console.log('Error has occurred while signing up new user.');
        yield put(signUpFailAction());
    }
};

function* signInSaga(action) {
    try {
        const auth = yield call(postSignIn, action.payload);

        if (auth) {
            // TODO: res.data is not final backend response; update when backend is ready
            yield put(signInSuccessAction(auth.data));
            // fetch shopping cart data
            const userId = auth.data.user.id; 
            yield put(getCartAction(userId));
        }
    } catch (e) {
        console.log('Error has occurred while signing in user.');
        yield put(signInFailAction());
    }
}

export function* authSaga() {
    yield all([
        takeLatest(signUpAction.type, signUpSaga),
        takeLatest(signInAction.type, signInSaga)
    ])
}