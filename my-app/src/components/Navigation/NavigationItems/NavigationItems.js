import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>
            burger builder
        </NavigationItem>
        {props.isAuthenticated ?
          <NavigationItem link="/orders">
             orders
          </NavigationItem>:  null
        }
        {!props.isAuthenticated ? 
            <NavigationItem link="/auth">
                auth
            </NavigationItem>: <NavigationItem link="/logout">logout</NavigationItem>
        }
        
    </ul>
);


export default navigationItems;