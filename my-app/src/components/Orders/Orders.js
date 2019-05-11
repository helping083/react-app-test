import React, {Component} from 'react';
import Order from '../Order/Order';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../utils/axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../UI-parts/Spinner/Spinner';


class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId)
    }

    render() {
        let orders = <Spinner/>
        if(!this.props.loading) {
         orders = this.props.orders.map((item)=>{
                return <Order key={item.id} ingredients={item.ingredients} price={item.price}/>
            })
         
        }
        if(!this.props.loading && !this.props.order) {
            orders = (
                <div>
                    <p>your orders data is empty</p>
                </div>
            )
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders:  state.order.orders,
        loading: state.order.isLoad,
        token:   state.auth.token,
        userId:  state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));