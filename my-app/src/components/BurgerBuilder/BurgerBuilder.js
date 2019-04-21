import React, {Component} from 'react'
import Auxialuary from '../../hoc/auxuilary/Auxialury'
import Burger from  '../Burger.js/Burger';
import BuildControls from '../../components/Burger.js/BuildControls/BuildControls';
import Modal from '../UI-parts/Modal/Modal';
import OrderSummary from '../Burger.js/OrderSummary/OrderSummary';
import axios from '../../utils/axios-orders';
import Spinner from '../UI-parts/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENTS_PRICES = {
    salad: 0.5,
    bacon: 2,
    cheese: 1,
    meat: 2
};

class BurgerBuilder extends Component {
    constructor(props){
        super(props);
        this.myRef = React.createRef();
    }
    state = {
        ingredients: null,
        totalPrice: 6,
        isOrder: false,
        isModal: false,
        loading: false
    }

    componentDidMount() {
        console.log(this.props);
      axios.get('https://react-burger-f1fcc.firebaseio.com/orders/-LcfPHe5WnfMEcBNk55I/ingredients.json')
        .then((item)=>{
            this.setState({ingredients: item.data});
        })
        .then((item)=>{
            this.calcTotalPrice({...this.state.ingredients})
        })
        .catch(error => {console.log(error)});
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
        this.isOrderHandler(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        
        const oldIngredient = this.state.ingredients[type];

        if (oldIngredient <=0 ) {
            return;
        }

        const updatedIngr = oldIngredient - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedIngr;
        const totalPrice = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - totalPrice;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.isOrderHandler(updatedIngredients);
    }

    isOrderHandler = (ingredients) => {
        //get ing values
        let ingredients_values = Object.values(ingredients);
        //sum of ing values
        let ingredients_sum = ingredients_values.reduce((prev,curr)=>{
            return prev+curr;
        },0);
        if (ingredients_sum === 0) {
            this.setState({isOrder: true})
        } else {
            this.setState({isOrder: false})
        }
        
    }
    
    modalHandler = () => {
        this.setState({isModal: true});
    }
    
    closeModalHandler = () => {
        this.setState({isModal:false});
    }

    cancelButtonHandler = ()=>{


    }

    calcTotalPrice = (states) => {
        let price = this.state.totalPrice;
        for(let key in states) {
            let ingPrice = states[key]*INGREDIENTS_PRICES[key];
            price+=ingPrice
        }
        this.setState({totalPrice:price});
    }

    continueButtonHandler = () => {
        const queryParams = [];
        for (let key in this.state.ingredients) {
            queryParams.push(encodeURIComponent(key)  + '=' + encodeURIComponent(this.state.ingredients[key]));
        }
        queryParams.push('price=', this.state.totalPrice)
        const queryStrings = queryParams.join('&'); 
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryStrings
        });
    }
    
    render() {
        const disabledButtons = {
            ...this.state.ingredients
        }
        
        for (let key in disabledButtons) {
            disabledButtons[key] = disabledButtons[key] <=0;
        }
        let orderSummary = null;
        
        let burger = <Spinner/>;  

        if(this.state.ingredients) {
            burger =
            (
             <Auxialuary>  
              <div ref={this.myRef}>
                  <Burger ingredients={this.state.ingredients}/> 
              </div>
              <BuildControls
                  totalPrice={this.state.totalPrice} 
                  addIngredient={this.addIngredientHandler}
                  removeIngredient={this.removeIngredientHandler}
                  //disabled controls
                  disabledInfo={disabledButtons}
                  //disabled ordernow button  
                  disabledOrder={this.state.isOrder}
                  //open modal component
                  openModal={this.modalHandler}/>
              </Auxialuary>   
            );
            orderSummary = 
              <OrderSummary 
                ingredients={this.state.ingredients} 
                closeModal={this.closeModalHandler}
                cancelButtonHandler={this.closeModalHandler}
                totalPrice={this.state.totalPrice}
                continueButtonHandler = {this.continueButtonHandler}/>; 
        }
        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }
       
         return (
            <Auxialuary>
                <Modal 
                  show={this.state.isModal}
                  modalCLosedHandler={this.closeModalHandler}
                    >
                    {orderSummary}
                </Modal>
               {burger}
            </Auxialuary>
        );
    }
}

export default WithErrorHandler(BurgerBuilder, axios);