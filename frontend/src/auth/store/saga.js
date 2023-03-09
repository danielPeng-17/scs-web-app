import { all, call, put, takeLatest } from "redux-saga/effects";
import { postSignUp } from '../../services';
import { signUpAction, signUpFailAction, signUpSuccessAction } from "./sliceReducer";

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

export function* authSaga() {
    yield all([
        takeLatest(signUpAction.type, signUpSaga)
    ])
}