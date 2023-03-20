import { all, fork } from 'redux-saga/effects';
import { authSaga } from '../../auth/store/saga';
import { cartSaga } from '../../pages/shoppingCart/store/saga';
import { orderSaga } from '../../pages/checkout/store/saga';

function* rootSaga() {
    yield all([
        authSaga,
        cartSaga,
        orderSaga
    ].map((saga) => fork(saga)));
}

export default rootSaga;