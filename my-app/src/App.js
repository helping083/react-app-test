import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './components/BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <p>it's working</p>
          <BurgerBuilder/>
        </Layout>  
      </div>
    );
  }
}

export default App;
