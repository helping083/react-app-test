import React, {Component} from 'react'
import Auxialuary from '../../hoc/auxuilary/Auxialury'
import Burger from  '../Burger.js/Burger';
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 1,
            bacon: 2,
            cheese: 2,
            meat: 2
        }
    }
    render() {
        return (
            <Auxialuary>
                <div>first</div>
                <div>second</div>
                <Burger ingredients={this.state.ingredients}/>
            </Auxialuary>
        );
    }
}

export default BurgerBuilder;