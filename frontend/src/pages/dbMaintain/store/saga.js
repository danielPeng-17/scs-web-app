import { all, call, put, takeLatest } from "redux-saga/effects";
import { queryAction, queryFailAction, querySuccessAction } from "./sliceReducer";

function* querySaga(action) {
    try {
        // TODO: add api call to backend for the query data
        const res = yield call(() => {}, action.payload.query);

        if (res.data) {
            yield put(querySuccessAction(res.data));
        } else {
            yield put(queryFailAction());
        }
    } catch (e) {
        console.error('Error has occurred while querying for data:', e.message);
    }
}

export function* dbmSaga() {
    yield all([
        takeLatest(queryAction.type, querySaga)
    ])
}