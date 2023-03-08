import { all, fork } from 'redux-saga/effects';

function* rootSaga() {
    yield all([

    ].map((saga) => fork(saga)));
}

export default rootSaga;