import React, {Component} from 'react';
import Button from '../../../components/UI-parts/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI-parts/Spinner/Spinner';
import Input from '../../../components/UI-parts/Input/Input';
import axios from '../../../utils/axios-orders';

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
               options: [{value: 'fastest', displayValue: 'fastest'}, 
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
      loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({loading: true});
        const formData = {}
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }
        if(!formData['deliveryMethod']) {
            formData['deliveryMethod'] = "cheapest";
        }
        console.log('form data', formData);
        const order = {
            ingredients: this.props.ingredients,
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
        console.log('updFormdata', updatedFormData);
        this.setState({orderForm: formData});
        
    }

    checlValidation = (value, rules, inputin) => {
        let isValid = true;
          if (rules.required) {
            isValid = value.trim() !=='' && isValid;
          }
        return isValid;
    }

    render() {
        const fromElementsArray = [];
        for (let key in this.state.orderForm) {
            fromElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
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
                          shouldValidate={item.config.validation}
                          touched={item.config.touched}
                          changed={(event)=>this.inputChanged(event, item.id)}
                        />
                    );
                })}
                <Button btnType = "Success">ORDER</Button>
            </form>
        );
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

export default ContactData;