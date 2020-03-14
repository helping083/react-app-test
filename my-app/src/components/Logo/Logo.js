import React from 'react';
import burgerLogo from '../../assets/img/burger-logo.png';
import classes from './Logo.css';
import { withRouter } from 'react-router-dom';

const logo = (props) => (
  <div className={classes.Logo}>
    <img 
      src={burgerLogo} 
      alt="logo" 
      onClick={ () => {
        props.history.push('/')
      }}
    />
  </div>
);

export default withRouter(logo);