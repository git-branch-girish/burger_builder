import { takeEvery } from 'redux-saga/effects';

import * as actionType from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeOutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { initIngredientSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';


export function* watchAuth() {
    yield takeEvery(actionType.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionType.AUTH_CHECK_TIMEOUT, checkAuthTimeOutSaga);
    yield takeEvery(actionType.AUTH_USER, authUserSaga);
    yield takeEvery(actionType.AUTH_CHECK_START, authCheckStateSaga);
}

export function* watchBurgerBuilder(){
    yield takeEvery(actionType.INIT_INGREDIENTS, initIngredientSaga);
}

export function* watchOrder(){
    yield takeEvery(actionType.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionType.FETCH_ORDERS, fetchOrdersSaga);
}





