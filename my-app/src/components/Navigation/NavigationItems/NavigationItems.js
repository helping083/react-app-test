import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { connect } from 'react-redux';
const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>
            burger builder
        </NavigationItem>
        <NavigationItem link="/orders">
           orders
        </NavigationItem>
    </ul>
);

const mapStateToProps = state => {
    console.log('state in nav', state)
    return {
        error: state.error
    }
}

export default connect(mapStateToProps)(navigationItems);