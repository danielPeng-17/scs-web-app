import { all, call, put, takeLatest } from "redux-saga/effects";
import {
    checkoutAction,
    checkoutFailAction,
    checkoutSuccessAction,
} from "./sliceReducer";
import { postOrder } from "../../../services";

function* checkoutSaga(action) {
    try {
        // TODO: calculate distance between source and destination
        // https://developers.google.com/maps/documentation/distance-matrix/start#maps_http_distancematrix_start-js
        const res = yield call(postOrder, action.payload);

        const { success } = res.data;

        if (success) {
            const { orderId, dateReceived, totalPrice } = res.data;

            yield put(
                checkoutSuccessAction({
                    success,
                    orderId,
                    dateReceived,
                    totalPrice,
                })
            );
        } else {
            const { errorMessage, errorCode } = res.data;

            yield put(checkoutFailAction({ success, errorMessage, errorCode }));
        }
    } catch (e) {
        console.error('Error has occurred:', e.message);
    }
}

export function* orderSaga() {
    yield all([takeLatest(checkoutAction.type, checkoutSaga)]);
}
