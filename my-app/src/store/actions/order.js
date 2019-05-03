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
//sync
export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}
//sync
export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILS,
        error: error
    }
}
//sync
export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

//async
export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrderStart())
        return (
            axios.get('orders.json')
            .then((item)=>{
                const fetchedwithspread = [];
                for (let key in item.data) {
                    fetchedwithspread.push({
                        ...item.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrdersSuccess(fetchedwithspread));
            })
            .catch((error) => {
              dispatch(fetchOrdersFail(error));
            })
        );
    }
}
