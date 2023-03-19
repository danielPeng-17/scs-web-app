import { all, call, put, takeLatest } from "redux-saga/effects";
// import { getCartAction } from "../../pages/shoppingCart/store/sliceReducer";
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
        console.log('in saga', action);
        const res = yield call(postSignUp, action.payload);

        if (res.data.isLoggedIn) {
            // TODO: res.data is not final backend response; update when backend is ready
            yield put(signUpSuccessAction(res.data));
            console.log('in res', res);
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
            // TODO: res.data is not final backend response; update when backend is ready
            yield put(signInSuccessAction(res.data));

            // fetch shopping cart data
            // const userId = res.data.user.id; 
            // yield put(getCartAction(userId));
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