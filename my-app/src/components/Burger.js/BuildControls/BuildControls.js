import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];
const buttonStyling = {
    textTransform: 'Uppercase'
};
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: {props.totalPrice}$</p>
        {controls.map((item)=>{
            return <BuildControl 
                        addIngredientHandler = {() => props.addIngredient(item.type)}
                        removeIngredient = {() => {props.removeIngredient(item.type)}}
                        key={item.label} 
                        label={item.label}
                        disabled={props.disabledInfo[item.type]}/>
        })}
        <button style={buttonStyling} 
                className={classes.OrderButton}
                disabled={props.disabledOrder}>order now</button>
    </div>
);
export default buildControls;