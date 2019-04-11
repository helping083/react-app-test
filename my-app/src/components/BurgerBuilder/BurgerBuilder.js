import React, {Component} from 'react'
import Auxialuary from '../../hoc/auxuilary/Auxialury'
import Burger from  '../Burger.js/Burger';
import BuildControls from '../../components/Burger.js/BuildControls/BuildControls';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1
        }
    }

    addIngredientHandler = (type) => {

    }
    removeIngredientHandler = () => {

    }
    render() {
        return (
            <Auxialuary>
               <Burger ingredients={this.state.ingredients}/>
               <BuildControls/>
            </Auxialuary>
        );
    }
}

export default BurgerBuilder;