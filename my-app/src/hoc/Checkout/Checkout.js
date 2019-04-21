import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        addprice: 6
    }

    componentWillMount() {
        const queryString = require('query-string');
        const parsed = queryString.parse(this.props.location.search);
        let ingredients = {};
        let totalPrice= 0;
        for (let key in parsed) {
            if (key === 'price') {
                totalPrice = +parsed[key];
            } else {
                ingredients[key] = +parsed[key];
            }
        }
        this.setState({ingredients:ingredients});
        this.setState({addprice: totalPrice})
    }

    checkoutCancelledHandler = () => {
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
                <Route 
                  path={this.props.match.path + '/contact-data'} 
                  component={()=>(
                    <ContactData 
                      ingredients={this.state.ingredients}
                      price={this.state.addprice}
                      />
                )}/>
            </div>
        );
    }
};

export default Checkout;