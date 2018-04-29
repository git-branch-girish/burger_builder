import { put } from 'redux-saga/effects';

import axios from '../../axios-order';
import * as actions from '../actions';


export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield axios.post('/order.json?auth=' + action.token, action.orderData);
        yield put(actions.purchaseBurgerSuccesss(response.data.name, action.orderData));
    } catch (error) {
        yield put(actions.purchaseBurgerFail(error));
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetcOrdersStart());
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try {
        const res = yield axios.get('/order.json' + queryParams);
        const fetchOrders = [];
        for (let key in res.data) {
            fetchOrders.push({
                ...res.data[key],
                id: key
            });
        }
        yield put(actions.fetchOrdersSuccess(fetchOrders));
    } catch (error) {
        yield put(actions.fetchOrdersFail(error));
    }
}