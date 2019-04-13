import React from 'react';
import Auxialiry from '../../../hoc/auxuilary/Auxialury';
import classes from './OrderSummary.css';
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
            <span className={classes.SpanClass}>x</span>
        </Auxialiry>
    );
};

export default orderSumarry;