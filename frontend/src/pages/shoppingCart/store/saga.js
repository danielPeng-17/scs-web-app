import { all, call, put, takeLatest } from "redux-saga/effects";
import { getCart } from "../../../services";
import { getCartAction, getCartSuccessAction } from "./sliceReducer";

export function* getCartSaga(action) {
    try {
        const res = yield call(getCart, action.payload);

        if (res) {
            yield put(getCartSuccessAction(res.data));
        }
    } catch (e) {
        console.log("Error fetching shopping cart items");
    }
}

export function* cartSaga() {
    yield all([
        takeLatest(getCartAction.type, getCartSaga)
    ]);
}