import * as actionTypes from './actionTypes';
import axios from '../../utils/axios-orders';

//sync functiom
export const  purchaseBurgerSuccess = (id, orderData)=> {
        return {
            type: actionTypes.PURCHASE_BURGER_SUCCESS,
            orderId: id,
            orderData: orderData
        };
};
//sync function
export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
       type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

//async function
export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(item => {
                dispatch(purchaseBurgerSuccess(item.data.name, orderData))
            })
            .catch((error)=>{
                dispatch(purchaseBurgerFail(error));
                console.log('error', error);
            });
    }
}