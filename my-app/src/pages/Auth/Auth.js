import React, { Component } from 'react';
import Input from '../../components/UI-parts/Input/Input';
import Button from '../../components/UI-parts/Button/Button';
import classes from './Auth.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email:  {
                elementhType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'email'
                },
                value: '',
                validation: {
                    required: true,
                    // isEmail: true
                },
                valid: false,
                touched: false    
            },
            password:  {
                elementhType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    // minLength: 6
                },
                valid: false,
                touched: false    
            }
        }
    }
    checlValidationAuth = (value, rules, inputin) => {
        let isValid = true;
          if (rules.required) {
            isValid = value.trim() !=='' && isValid;
          }
        return isValid;
    }
    inputChanged = (event, controlName) => {
        const formData = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checlValidationAuth(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: formData})
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email, this.state.controls.password);
    }

    render() {
        const fromElementsArray = [];
        for (let key in this.state.controls) {
            fromElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        
        const form = fromElementsArray.map((item, index)=>{
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
                  changed={(event)=>this.inputChanged(event, item.id)}/>
            );
        })
        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                      {form}
                     <Button btnType="Success">Login</Button>
                </form>
            </div>
        )
    };
};

const mapStateToProps = state => {
    return {

    }
}

export const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => { dispatch(actions.auth(email.value, password.value)) }
    }
}

export default connect(null,mapDispatchToProps)(Auth);