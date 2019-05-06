import React, {Component} from 'react';
import Order from '../Order/Order';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../utils/axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../UI-parts/Spinner/Spinner';


class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token)
    }

    render() {
        let orders = <Spinner/>
        if(!this.props.loading) {
         orders = this.props.orders.map((item)=>{
                return <Order key={item.id} ingredients={item.ingredients} price={item.price}/>
            })
         
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
        token:   state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));