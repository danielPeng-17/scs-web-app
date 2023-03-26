import { all, call, put, takeLatest } from "redux-saga/effects";
import { postAdminQuery } from "../../../services";
import { queryAction, queryFailAction, querySuccessAction } from "./sliceReducer";

function* querySaga(action) {
    try {
        const res = yield call(postAdminQuery, action.payload);
        console.log(res);
        if (res.data.success) {
            console.log("kasdasdfa");
            yield put(querySuccessAction(res.data.response));
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