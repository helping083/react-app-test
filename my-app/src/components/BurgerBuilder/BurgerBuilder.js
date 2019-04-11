import React, {Component} from 'react'
import Auxialuary from '../../hoc/auxuilary/Auxialury'
import Burger from  '../Burger.js/Burger';
class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {}; 
    }
    render() {
        return (
            <Auxialuary>
                <div>first</div>
                <div>second</div>
                <Burger/>
            </Auxialuary>
        );
    }
}

export default BurgerBuilder;