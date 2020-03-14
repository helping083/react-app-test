import React, { Component } from 'react';
import Input from '../../components/UI-parts/Input/Input';
import Spinner from '../../components/UI-parts/Spinner/Spinner';
import Button from '../../components/UI-parts/Button/Button';
import classes from './Auth.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Tippy from '../../components/UI-parts/tippy/tippy';
import * as actions from '../../store/actions/index';
class Auth extends Component {

  state = {
    controls: {
      email: {
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
      password: {
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
    },
    isSignUp: false,
    asyncSubscriptions: null
  }


  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  checlValidationAuth = (value, rules, inputin) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
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
    this.setState({ controls: formData })
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email, this.state.controls.password, this.state.isSignUp);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => { return { isSignUp: !prevState.isSignUp } });
  }

  onHandleAuthError = (errorMSG) => {
    switch (errorMSG) {
      case "EMAIL_NOT_FOUND":
        return (<p> email not found </p>)
      default:
        return null;
    }
  }

  render() {
    const fromElementsArray = [];
    for (let key in this.state.controls) {
      fromElementsArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    let form = fromElementsArray.map((item, index) => {
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
          changed={(event) => this.inputChanged(event, item.id)} />
      );
    })
    if (this.props.loading) {
      form = <Spinner />
    }

    let errorMessage = null
    if (this.props.error) {
      // errorMessage=(
      //     <p>
      //         {this.props.error.message}
      //     </p>
      // )
      errorMessage = this.onHandleAuthError(this.props.error.message);
    }
    let authRedirect = null
    if (this.props.isAuth) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        <form onSubmit={this.submitHandler}>
          {form}
          {errorMessage}
          <Button btnType="Success" type="submit">Login</Button>
          <Button
            clicked={this.switchAuthModeHandler}
            btnType="Danger"
            type="button"
          >
            {this.state.isSignUp ? 'signup' : 'signin'}
          </Button>
        </form>

        <Tippy
          tippyData={this.state.isSignUp ? 'create a user' : 'log-in'}>
          ?
        </Tippy>
      </div>
    )
  };
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => { dispatch(actions.auth(email.value, password.value, isSignUp)) },
    onSetAuthRedirectPath: () => { dispatch(actions.setAuthRedirectPath('/')) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);