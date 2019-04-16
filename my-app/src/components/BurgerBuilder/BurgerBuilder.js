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
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1
        },
        totalPrice: 6,
        isOrder: false,
        isModal: false,
        loading: false
    }

    componentDidMount() {
      
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
    continueButtonHandler = () => {
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Oleh",
                addres: {
                    street: 'Test',
                    zipcod: 79049,
                    country: 'Ukraine',
                    email: "helping083@gmail.com"
                }
            }
        }
        axios.post('/orders.json', order)
            .then((item)=>{
                console.log('post req', item);
                this.setState({loading:false, isModal: false})
            })
            .then((item)=>{
                this.closeModalHandler();
            })
            .catch((error)=>{
                this.setState({loading:false, isModal:false})
                console.log('error', error);
            });
    }
    
    render() {
        const disabledButtons = {
            ...this.state.ingredients
        }
        
        for (let key in disabledButtons) {
            disabledButtons[key] = disabledButtons[key] <=0;
        }
        let orderSummary = 
          <OrderSummary 
            ingredients={this.state.ingredients} 
            closeModal={this.closeModalHandler}
            cancelButtonHandler={this.closeModalHandler}
            totalPrice={this.state.totalPrice}
            continueButtonHandler = {this.continueButtonHandler}/>; 

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
    }
}

export default WithErrorHandler(BurgerBuilder, axios);