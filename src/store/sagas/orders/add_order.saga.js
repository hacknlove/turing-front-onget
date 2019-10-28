import { put, takeLatest, call } from 'redux-saga/effects';
import ordersService from "../../../services/ordersService";

import {
    ADD_ORDER,
    ADD_ORDER_SUCCESS,
    ADD_ORDER_ERROR
}
    from "../../actions/orders";

function* addOrderSaga(action) {


    try {
        const data = yield call(ordersService.addOrder, action.payload);

        const stripeData = yield call(ordersService.chargeStripe, {
            stripeToken: action.payload.stripeToken,
            order_id: data.orderId,
            description: action.payload.description,
            amount: action.payload.amount,
            currency: action.payload.currency
        });


        yield put({
            type: ADD_ORDER_SUCCESS,
            payload: data
        });

        yield put({
            type: SHOW_TOAST,
            payload: {
                variant: 'success',
                message: 'Order Placed Successfully!'
            }
        });

    } catch (error) {
        yield put({
            type: ADD_ORDER_ERROR, payload: error
        });
    }

}


export function* addOrderSagaWatcher() {
    yield takeLatest(ADD_ORDER, addOrderSaga);
}