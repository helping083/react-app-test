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
          value: 'Oleh'    
        },
        street: {
            elementhType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'your adress'
            },
            value: ' '
        },
        zipCode: {
            elementhType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'zipCode',
            },
            value: ''
        },
        country: {
            elementhType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'country'
            },
            value: ''
        },
        email: {
            elementhType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'email'
            },
            value: ''
        },
        deliveryMethod: {
            elementhType: 'select',
            elementConfig: {
               options: [{value: 'fastest', displayValue: 'fastest'}, 
                         {value: 'cheapest', displayValue: 'cheapest'}]
            },
            value: ''
        }
      },
      loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()
        console.log(this.props);
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
    render() {
        let form = (
            <form>
                <Input  inputtype = "input" type="text" name="name" placeholder="Your Name"/>
                <Input  inputtype = "input"  type="email" name="email" placeholder="Your email"/>
                <Input  inputtype = "input"  type="text" name="street" placeholder="Your Adrress"/>
                <Input  inputtype = "input"  type="number" name="postalCode" placeholder="Your zip-code"/>
                <Button btnType = "Success" clicked={this.orderHandler}>ORDER</Button>
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