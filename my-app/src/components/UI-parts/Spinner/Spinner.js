import classes from './Spinner.css';
import React from 'react';
const spinner = (props) => (
    <div className={classes.loader}>
        Loading...
    </div>
);

export default spinner;