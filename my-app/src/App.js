import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './components/BurgerBuilder/BurgerBuilder';
import Checkout from './hoc/Checkout/Checkout';
import Orders from './components/Orders/Orders';
import { Route ,Switch, withRouter, Redirect } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import Logout from './pages/Logout/Logot'

class App extends Component {

  componentDidMount() {
   this.props.onTryAutoSignUp();
  }
  
  render() {
      let routes = (
        <Switch>
           <Route path="/auth" component={Auth}/>
           <Route path="/" exact component={BurgerBuilder}/>
           <Redirect to='/'/>
        </Switch>
      );
      if (this.props.isAuththenticated) {
        routes= (
          <Switch>
            <Route path="/checkout"  component={Checkout}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/auth" component={Auth}/>
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
