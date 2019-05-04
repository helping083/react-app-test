import React, { Component } from 'react';
import Input from '../../components/UI-parts/Input/Input';
import Button from '../../components/UI-parts/Button/Button';

class Auth extends Component {
    constructor(props) {
        super(props);
    }
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
                    isEmail: true
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
                    minLength: 6
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
    inputChanged = (event, inputIndent) => {

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
            <div>
                <form>
                      {form}
                     <Button btnType="Success">Login</Button>
                </form>
            </div>
        )
    };
};
export default Auth;