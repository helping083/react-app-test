import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import { controls } from '../../../constants/controls';
import { buttonStyling } from '../../../constants/styleConstants';

const buildControls = (props) => (
  <div className={classes.BuildControls}>

    <p>Current price: {props.totalPrice}$</p>

    {controls.map((item) => {
      return <BuildControl
        addIngredientHandler={() => props.addIngredient(item.type)}
        removeIngredient={() =>  props.removeIngredient(item.type)}
        key={item.label}
        label={item.label}
        disabled={props.disabledInfo[item.type]}
        calcHeight={props.calcHeightHandler}
      />
    })}

    <button style={buttonStyling}
      className={classes.OrderButton}
      disabled={props.disabledOrder}
      onClick={props.openModal}
    >
      {props.isAuth ? "order now" : "sign-up"}
    </button>
  </div>
);

export default buildControls;