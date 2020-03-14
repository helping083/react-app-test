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

export const calcTotalPrice = (ingredients) => {
  return {
    type: actionTypes.CALC_PRICE,
    ingredients: ingredients
  }
}

export const setId = (id) => {
  return {
    type: actionTypes.SET_ID_TO_REDIRECT,
    id_to_redirect: id
  }
}

export const setIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const initIngridients = () => {
  return dispatch => {
    return (
      axios.get('https://react-burger-f1fcc.firebaseio.com/Ingredients.json')
        .then((item) => {
          dispatch(setIngredients(item.data));
          dispatch(calcTotalPrice(item.data))
          return item
        })
        .catch(err => {
          dispatch(setIngredientsFailed())
        })
    )
  };
};