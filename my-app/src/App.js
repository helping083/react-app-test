import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './components/BurgerBuilder/BurgerBuilder';
import { Route ,Switch, withRouter, Redirect } from 'react-router-dom';
import AsyncComponent from '../src/hoc/async/asyncComponent';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import Logout from './pages/Logout/Logot'

const asyncCheckout = AsyncComponent(()=>{
   return import('./hoc/Checkout/Checkout');
});

const asyncOrders = AsyncComponent(()=>{
  return import('./components/Orders/Orders');
});

const asyncAuth = AsyncComponent(()=>{
  return import('./pages/Auth/Auth');
});

class App extends Component {

  componentDidMount() {
   this.props.onTryAutoSignUp();
  }
  
  render() {
      let routes = (
        <Switch>
           <Route path="/auth" component={asyncAuth}/>
           <Route path="/" exact component={BurgerBuilder}/>
           <Redirect to='/'/>
        </Switch>
      );
      if (this.props.isAuththenticated) {
        routes= (
          <Switch>
            <Route path="/checkout"  component={asyncCheckout}/>
            <Route path="/orders" component={asyncOrders}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/auth" component={asyncAuth}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to='/'/>
          </Switch>
        );
      };
  
    return (
      <div>
        <Layout>
          {routes}
        </Layout>  
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
      isAuththenticated: state.auth.token !==null
    };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
