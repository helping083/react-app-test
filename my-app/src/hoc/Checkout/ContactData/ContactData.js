import React, {Component} from 'react';
import Button from '../../../components/UI-parts/Button/Button';
import classes from './ContactData.css';
import axios from '../../../utils/axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
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
                console.log('post req', item);
                this.setState({loading:false})
            })
            .then((item)=>{
                // this.closeModalHandler();
            })
            .catch((error)=>{
                this.setState({loading:false})
                console.log('error', error);
            });
    }
    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                <form>
                  <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                  <input className={classes.Input} type="email" name="email" placeholder="Your email"/>
                  <input className={classes.Input} type="text" name="street" placeholder="Your Adrress"/>
                  <input className={classes.Input} type="number" name="postalCode" placeholder="Your zip-code"/>
                  <Button btnType = "Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;