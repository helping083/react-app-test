import * as actionTypes from '../actions/actionTypes';

const INGREDIENTS_PRICES = {
    salad: 0.5,
    bacon: 2,
    cheese: 1,
    meat: 2
};

const initialState =  {
    ingredients: null,
    totalPrice: 6,
    error: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
            };
        case actionTypes.SET_INGREDIENTS:
        console.log('set ingredients data in reducer', action)
            return {
                ...state,
                ingredients: action.ingredients,
                error: false
            }
         
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}
export default reducer;