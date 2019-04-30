import * as actionTypes from './actionTypes';
import axios from '../../utils/axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const setIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngridients = () => {
    return dispatch => {
        axios.get('https://react-burger-f1fcc.firebaseio.com/Ingredients.json')
        .then((item)=>{
            dispatch(setIngredients(item.data));
        })
        .catch(err=>{
            dispatch(setIngredientsFailed())
        });
    };
};