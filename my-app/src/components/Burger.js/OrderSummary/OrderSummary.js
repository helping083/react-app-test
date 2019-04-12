import React from 'react';
import Auxialiry from '../../../hoc/auxuilary/Auxialury';

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
        </Auxialiry>
    );
};

export default orderSumarry;