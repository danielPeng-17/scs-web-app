import { all, call, put, takeLatest } from "redux-saga/effects";
import {
    checkoutAction,
    checkoutFailAction,
    checkoutSuccessAction,
    fetchTruckAction,
    fetchTruckFailAction,
    fetchTruckSuccessAction,
} from "./sliceReducer";
import { getTruck, postOrder } from "../../../services";

function* checkoutSaga(action) {
    try {
        // TODO: calculate distance between source and destination
        // https://developers.google.com/maps/documentation/distance-matrix/start#maps_http_distancematrix_start-js
        const res = yield call(postOrder, action.payload);

        const { success } = res.data;

        if (success) {
            yield put(checkoutSuccessAction(res.data));
        } else {
            const { errorMessage, errorCode } = res.data;

            yield put(
                checkoutFailAction({
                    success,
                    errorMessage,
                    errorCode,
                })
            );
        }
    } catch (e) {
        console.error("Error has occurred:", e.message);
    }
}

function* fetchTruckSaga(action) {
    try {
        const res = yield call(getTruck);

        if (res.data.success) {
            yield put(fetchTruckSuccessAction(res.data.trucks));
        } else {
            yield put(fetchTruckFailAction());
        }
    } catch (e) {
        console.error("Error has occurred:", e.message);
    }
}

export function* orderSaga() {
    yield all([
        takeLatest(checkoutAction.type, checkoutSaga),
        takeLatest(fetchTruckAction.type, fetchTruckSaga),
    ]);
}
