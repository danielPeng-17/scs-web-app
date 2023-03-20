import { all, fork } from 'redux-saga/effects';
import { authSaga } from '../../auth/store/saga';

function* rootSaga() {
    yield all([
        authSaga,
    ].map((saga) => fork(saga)));
}

export default rootSaga;