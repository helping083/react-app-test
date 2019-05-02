import * as actionTypes from '../actions/actionTypes';

const initState = {
    orders: [],
    isLoad: false,
    purchased: false
}

const reducer = (state = initState, action)=>{
    switch(action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                isLoad: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                isLoad: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                isLoad: false
            };
        default:
            return state; 
    }
}

export default reducer;