import { all, call, put, takeLatest } from "redux-saga/effects";
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

        if (res.data.isLoggedIn) {
            yield put(signUpSuccessAction(res.data));
        } else {
            yield put(signUpFailAction());
        }
    } catch (e) {
        console.error('Error has occurred while signing up new user: ', e.message);
    }
};

function* signInSaga(action) {
    try {
        const res = yield call(postSignIn, action.payload);

        if (res.data.isLoggedIn) {
            yield put(signInSuccessAction(res.data));
        } else {
            yield put(signInFailAction(res.data));
        }
    } catch (e) {
        console.error('Error has occurred while signing in user:', e.message);
    }
}

export function* authSaga() {
    yield all([
        takeLatest(signUpAction.type, signUpSaga),
        takeLatest(signInAction.type, signInSaga)
    ])
}