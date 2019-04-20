import React from 'react';
import classes from './CheckoutSummary.css';
import Burger from '../../Burger.js/Burger';
import Button from '../../UI-parts/Button/Button';

const checkoutSummary = (props) => {
    return (
      <div className={classes.CheckoutSumm}>
        <h1>We hope it'll taste well</h1>
        <div style={{
            width: '100%',
            margin: 'auto'
          }}>
          <Burger ingredients={props.ingredients}/>
        </div>
        <Button 
          btnType="Danger"
          clicked={props.onCheckoutCancelled}>
            CANCEL
        </Button>
        <Button 
          btnType="Success"
          clicked={props.onCheckoutContinued}>
            CONTINUE
        </Button>
      </div>  
    );
};

export default checkoutSummary