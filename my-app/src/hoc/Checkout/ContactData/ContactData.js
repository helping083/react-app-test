import React, {Component} from 'react';
import Button from '../../../components/UI-parts/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI-parts/Spinner/Spinner';
import Input from '../../../components/UI-parts/Input/Input';
import axios from '../../../utils/axios-orders';
import { connect } from 'react-redux';

class ContactData extends Component {
    state = {
      orderForm: {
        name:  {
          elementhType: 'input',
          elementConfig: {
              type: 'text',
              placeholder: 'your name'
          },
          value: '',
          validation: {
              required: true
          },
          valid: false,
          touched: false    
        },
        street: {
            elementhType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'your adress'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false 
        },
        zipCode: {
            elementhType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'zipCode',
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false  
        },
        country: {
            elementhType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false  
        },
        email: {
            elementhType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'email'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false  
        },
        deliveryMethod: {
            elementhType: 'select',
            elementConfig: {
               options: [{value:'', displayValue:''},{value: 'fastest', displayValue: 'fastest'}, 
                         {value: 'cheapest', displayValue: 'cheapest'}]
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
      },
      loading: false,
      formIsValid: false
    }
    // set data to the server
    orderHandler = (event) => {
        event.preventDefault()
        this.setState({loading: true});
        const formData = {}
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }
        //set default value for select input
        if(!formData['deliveryMethod']) {
            formData['deliveryMethod'] = "cheapest";
        }
        console.log('form data', formData);
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then((item)=>{
                this.setState({loading:false})

            })
            .then((item)=>{
                this.props.history.push('/');
            })
            .catch((error)=>{
                this.setState({loading:false})
                console.log('error', error);
            });
    }
    // validate form and update state while user typing in the form
    inputChanged = (event, inputIndent) => {
        const formData = {
            ...this.state.orderForm
        }
        const updatedFormData = {
            ...formData[inputIndent]
        };
        updatedFormData.value = event.target.value;
        updatedFormData.valid = this.checlValidation(updatedFormData.value, updatedFormData.validation, inputIndent);
        updatedFormData.touched=true;
        formData[inputIndent] = updatedFormData;
        // console.log('updFormdata', updatedFormData);
        let formIsValid = true;
        for(let key in formData) {
            formIsValid= formData[key].valid && formIsValid
        }
        console.log('form is valid', formIsValid)
        this.setState({orderForm: formData});
        this.setState({formIsValid: formIsValid});
        console.log('setstate', this.state)
    }
    //custom validation for form
    checlValidation = (value, rules, inputin) => {
        let isValid = true;
          if (rules.required) {
            isValid = value.trim() !=='' && isValid;
          }
        return isValid;
    }

    render() {
        //create data for the input component
        const fromElementsArray = [];
        for (let key in this.state.orderForm) {
            fromElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        //create form
        let form = (
            <form onSubmit={this.orderHandler}>
                {fromElementsArray.map((item)=>{
                    return (
                        <Input
                          key={item.id}
                          invalid={!item.config.valid} 
                          elementhType={item.config.elementhType}
                          elementConfig={item.config.elementConfig}
                          value={item.config.value}
                          valueType={item.config.elementConfig.placeholder}
                          shouldValidate={item.config.validation}
                          touched={item.config.touched}
                          changed={(event)=>this.inputChanged(event, item.id)}
                        />
                    );
                })}
                <Button btnType = "Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        //show spinner while sending data to the server
        if (this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);