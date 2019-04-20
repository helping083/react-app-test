import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './components/BurgerBuilder/BurgerBuilder';
import Checkout from './hoc/Checkout/Checkout';
import { Route ,Switch } from 'react-router-dom';

class App extends Component {
 
  
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/" exact component={BurgerBuilder}/>
          </Switch>
        </Layout>  
      </div>
    );
  }
}

export default App;
