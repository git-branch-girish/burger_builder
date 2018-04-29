import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const INGREDIENT_PRICES = {
    salad: 20,
    bacon: 15,
    cheese: 10,
    meat: 30,
}

const initialState = {
    ingredients: null,
    totalPrice: 20,
    error: false,
    building: false
}

const addIngredient = (state, action) => {
    const updatedIntgredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    };
    const updatedIntgredients = updateObject(state.ingredients, updatedIntgredient);
    const updatedState = {
        ingredients: updatedIntgredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIng = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    };
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedSt);
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 20,
        error: false,
        building: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return updateObject(state, { error: true });
        default: return state;
    }
}

export default reducer;