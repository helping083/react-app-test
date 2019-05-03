import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/burger-utils';
const initState = {
    orders: [],
    isLoad: false,
    purchased: false
}

const reducer = (state = initState, action)=>{
    switch(action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, {purchased:false})
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, {isLoad: true})
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            let newOrder = updateObject(action.orderData, {id: action.orderId})
            return updateObject(state, {
                isLoad: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            });
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state, {isLoad: false})
        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, {isLoad: true})
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, {orders: action.orders, isLoad: false })
        case actionTypes.FETCH_ORDERS_FAILS:
            return updateObject(state, {isLoad: false})
        default:
            return state; 
    }
}

export default reducer;