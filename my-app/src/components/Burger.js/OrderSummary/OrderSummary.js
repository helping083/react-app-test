import React from 'react';
import Auxialiry from '../../../hoc/auxuilary/Auxialury';
import classes from './OrderSummary.css';
import Button from '../../UI-parts/Button/Button';

const spanStyle = {
    textTransform: 'Uppercase'
}

const orderSumarry = (props) => {
    const ingsSum  = Object.keys(props.ingredients)
        .map((item)=>{
            return (<li key={item}>
                     <span style={spanStyle}>{item}:</span> {props.ingredients[item]}
                   </li>
            );
        });
    return (
        <Auxialiry>
            <h3>Your order</h3>
            <p>Your ingredients:</p>
            <ul>
                {ingsSum}
            </ul>
            <p>Total price: {props.totalPrice}$</p>
            <span className={classes.SpanClass} onClick={props.closeModal}>x</span>
            <Button 
              btnType="Danger"
              clicked={props.cancelButtonHandler}>cancel</Button>
            <Button 
              btnType="Success"
              clicked={props.continueButtonHandler}>continue</Button>
        </Auxialiry>
    );
};

export default orderSumarry;