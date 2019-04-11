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
            return <BuildControl key={item.label} label={item.label}/>
        })}
    </div>
);
export default buildControls;