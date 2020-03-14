import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auxialuary from '../../hoc/auxuilary/Auxialury';
// import FormikForm from '../UI-parts/formik-form/formikForm';
import Burger from '../Burger.js/Burger';
import BuildControls from '../../components/Burger.js/BuildControls/BuildControls';
import Modal from '../UI-parts/Modal/Modal';
import OrderSummary from '../Burger.js/OrderSummary/OrderSummary';
import axios from '../../utils/axios-orders';
import Spinner from '../UI-parts/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
// import Position from '../UI-parts/Popper/Popper';
import { calcBurgerHeight } from '../../utils/burger-utils';

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  state = {
    isOrder: false,
    isModal: false
  }

  componentDidMount() {
    this.props.onInitIngredients();
    
  };

  isOrderHandler = (ingredients) => {
    //get ing values
    let ingredients_values = Object.values(ingredients);
    //sum of ing values
    let ingredients_sum = ingredients_values.reduce((prev, curr) => {
      return prev + curr;
    }, 0);
    if (ingredients_sum === 0) {
      return true;
    } else {
      return false;
    };
  };
 
  modalHandler = () => {
    if (this.props.isAuth) {
      this.setState({ isModal: true });
    } else {
      this.props.onSethRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  closeModalHandler = () => {
    this.setState({ isModal: false });
  };

  continueButtonHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  showPopper = () => {
    this.setState(prevState => ({
      isPopper: !prevState.isPopper,
    }));
  };

  calcHeightHandler = () => {
    calcBurgerHeight(this.myRef)
  }

  render() {
    const disabledButtons = {
      ...this.props.ing
    }

    for (let key in disabledButtons) {
      disabledButtons[key] = disabledButtons[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.props.error ? <p>ingredients can't be loaded</p> : <Spinner />;

    if (this.props.ing) {
      burger =
        (
          <Auxialuary>
            <div ref={this.myRef}>
              <Burger ingredients={this.props.ing} />
            </div>
            <BuildControls
              totalPrice={this.props.price}
              isAuth={this.props.isAuth}
              addIngredient={this.props.onIngredientAdded}
              removeIngredient={this.props.onIngredientRemoved}
              calcHeightHandler={this.calcHeightHandler}
              //disabled controls
              disabledInfo={disabledButtons}
              //disabled ordernow button  
              disabledOrder={this.isOrderHandler(this.props.ing)}
              //open modal component
              openModal={this.modalHandler} />
          </Auxialuary>
        );
      orderSummary =
        <OrderSummary
          ingredients={this.props.ing}
          closeModal={this.closeModalHandler}
          cancelButtonHandler={this.closeModalHandler}
          totalPrice={this.props.price}
          continueButtonHandler={this.continueButtonHandler}
        />;
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

const mapStateToProps = state => {
  return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    purchased: state.order.purchased,
    isAuth: state.auth.token !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngridients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSethRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));