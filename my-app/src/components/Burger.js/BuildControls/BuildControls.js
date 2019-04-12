import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];
 
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        {controls.map((item)=>{
            return <BuildControl 
                        addIngredientHandler = {() => props.addIngredient(item.type)}
                        removeIngredient = {() => {props.removeIngredient(item.type)}}
                        key={item.label} 
                        label={item.label}
                        disabled={props.disabledInfo[item.type]}/>
        })}
    </div>
);
export default buildControls;