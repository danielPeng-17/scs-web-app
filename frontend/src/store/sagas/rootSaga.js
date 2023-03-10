import { all, fork } from 'redux-saga/effects';
import { authSaga } from '../../auth/store/saga';
import { cartSaga } from '../../pages/shoppingCart/store/saga';

function* rootSaga() {
    yield all([
        authSaga,
        cartSaga
    ].map((saga) => fork(saga)));
}

export default rootSaga;