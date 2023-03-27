import { all, fork } from 'redux-saga/effects';
import { authSaga } from '../../auth/store/saga';
import { orderSaga } from '../../pages/checkout/store/saga';
import { dbmSaga } from '../../pages/dbMaintain/store/saga';

function* rootSaga() {
    yield all([
        authSaga,
        orderSaga,
        dbmSaga,
    ].map((saga) => fork(saga)));
}

export default rootSaga;