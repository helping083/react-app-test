import React from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
const modal = React.memo(props => (
    <div>
        <Backdrop show={props.show} clicked={props.modalCLosedHandler}/>
        <div 
            className={classes.Modal}
            style={{
              transform: props.show ? 'translateY(0)': 'translateY(-100vh)',
              opacity: props.show ? '1': '0',
              overflow: 'hidden'
            }}>
            {props.children}
        </div>
    </div>
));

export default modal;