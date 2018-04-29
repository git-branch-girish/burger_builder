import { put } from 'redux-saga/effects';

import axios from '../../axios-order';
import * as actions from '../actions/';

export function* initIngredientSaga(action){
    const response = yield axios.get('https://my-react-burger-e6b03.firebaseio.com/ingredients.json');
    try {
        yield put(actions.setIngredient(response.data));
    } catch(err){
        yield put(actions.fetchIngredientsFalied());
    }
}