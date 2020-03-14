import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }    
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
        setTimeout(()=>{
            this.focusDiv();
        });
       
    }
    
    focusDiv = ()=> {
        ReactDOM.findDOMNode(this.refs.theDiv).focus();
    }
    render() {
        let summary = <Redirect to='/'/>
       
        if (this.props.ings) {
            const purchasedRedirect =  this.props.purchased ? <Redirect to='/'/>: null;
            summary = (
                <div>
                  {purchasedRedirect}  
                  <CheckoutSummary
                    onCheckoutCancelled={this.checkoutCancelledHandler}
                    onCheckoutContinued={this.checkoutContinuedHandler} 
                    ingredients={this.props.ings}/>
                  <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}
                  />
                </div>
            );
        }
        return (
            <>
              {summary}
              <div ref = "theDiv" tabIndex={-1}></div>
            </>    
        );
    }
};
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onInitBurger: ()=> dispatch(actions.initIngridients())
    }
}

export default connect(mapStateToProps,mapDispatchToProps )(Checkout);