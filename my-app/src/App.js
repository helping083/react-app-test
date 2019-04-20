import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './components/BurgerBuilder/BurgerBuilder';
import Checkout from './hoc/Checkout/Checkout';
import { Route } from 'react-router-dom';

class App extends Component {
 
  
  render() {
    return (
      <div>
        <Layout>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout}/>
        </Layout>  
      </div>
    );
  }
}

export default App;
