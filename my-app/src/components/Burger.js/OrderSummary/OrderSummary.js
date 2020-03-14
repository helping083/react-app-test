import React, {Component} from 'react';
import Auxialiry from '../../../hoc/auxuilary/Auxialury';
import classes from './OrderSummary.css';
import Button from '../../UI-parts/Button/Button';
const spanStyle = {
    textTransform: 'Uppercase'
}

class OrderSumarry extends Component {
  render() {
    const ingsSum  = Object.keys(this.props.ingredients)
    .map((item)=>{
        return (
            <li key={item}>
                 <span style={spanStyle}>{item}:</span> {this.props.ingredients[item]}
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
            <p>Total price: {this.props.totalPrice}$</p>
            <span className={classes.SpanClass} onClick={this.props.closeModal}>x</span>
            <Button 
              btnType="Danger"
              clicked={this.props.cancelButtonHandler}>cancel</Button>
            <Button 
              btnType="Success"
              clicked={this.props.continueButtonHandler}>continue</Button>
        </Auxialiry>
    );
  }
}  

export default OrderSumarry;