import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 0
        }
    }
    componentDidMount() {
        console.log('props in check', this.props)
        const queryString = require('query-string');
        const parsed = queryString.parse(this.props.location.search);
        let ingredients = {}
        for (let key in parsed) {
            ingredients[key] = +parsed[key];
        }
        this.setState({ingredients:ingredients})
    }
    checkoutCancelledHandler = () => {
        console.log('hello');
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    render() {
        return (
            <div>
                <CheckoutSummary
                  onCheckoutCancelled={this.checkoutCancelledHandler}
                  onCheckoutContinued={this.checkoutContinuedHandler} 
                  ingredients={this.state.ingredients}/>
                <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
            </div>
        );
    }
};

export default Checkout;