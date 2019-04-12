import React, {Component} from 'react'
import Auxialuary from '../../hoc/auxuilary/Auxialury'
import Burger from  '../Burger.js/Burger';
import BuildControls from '../../components/Burger.js/BuildControls/BuildControls';

const INGREDIENTS_PRICES = {
    salad: 0.5,
    bacon: 2,
    cheese: 1,
    meat: 2
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        const oldIngredient = this.state.ingredients[type];
        const updatedIngr = oldIngredient + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedIngr;
        const totalPrice = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice+totalPrice;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    }
    removeIngredientHandler = (type) => {
        const oldIngredient = this.state.ingredients[type];
        const updatedIngr = oldIngredient - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedIngr;
        const totalPrice = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - totalPrice;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    }
    render() {
        return (
            <Auxialuary>
               <Burger ingredients={this.state.ingredients}/>
               <BuildControls 
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}/>
            </Auxialuary>
        );
    }
}

export default BurgerBuilder;