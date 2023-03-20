import { all, call, put, takeLatest } from "redux-saga/effects";
import { checkoutAction, checkoutFailAction, checkoutSuccessAction } from "./sliceReducer";
import { postOrder } from "../../../services";

function* checkoutSaga(action) {
    try {
        const { 
            shippingAddress,
            shippingCity,
            shippingProvince,
            shippingCountry,
            shippingPostalCode,
            billingAddress,
            billingCity,
            billingProvince,
            billingCountry,
            billingPostalCode,
            dateIssued,
            dateReceived,
            paymentCode,
            userId,
            tripId,
            totalPrice,
        } = action.payload;
        const fullShippingAddress = `${shippingAddress}, ${shippingCity}, ${shippingProvince}, ${shippingCountry}, ${shippingPostalCode}`; 
        const fullBillingAddress = `${billingAddress}, ${billingCity}, ${billingProvince}, ${billingCountry}, ${billingPostalCode}`; 
        const formattedPayload = {
            dateIssued,
            dateReceived,
            totalPrice,
            paymentCode,
            userId,
            tripId,
            shippingAddress: fullShippingAddress,
            billingAddress: fullBillingAddress,
        }
        const res = yield call(postOrder, formattedPayload);
        if(res.data) {
            yield put(checkoutSuccessAction(res.data));
        } else {
            yield put(checkoutFailAction());
        }
    } catch(e) {
        console.log(e.message);
    }

}

export function* orderSaga() {
    yield all([
        takeLatest(checkoutAction.type, checkoutSaga)
    ])
}