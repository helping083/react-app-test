import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import Backdrop from '../UI-parts/Backdrop/Backdrop'
import Auxialury from '../../hoc/auxuilary/Auxialury';

const sideDrawer = (props) => {
    const attachedClasses =  [classes.SideDrawer, classes.Close];
    if(props.open) {
        attachedClasses[1] = classes.Open;
    } else {
        attachedClasses[1] = classes.Close;
    }
    return (
      <Auxialury>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
          <div className={classes.Logo}> 
            <Logo/>
          </div>
          <nav>
            <NavigationItems/>
          </nav>
        </div>
      </Auxialury>
       
    );
}



export default sideDrawer;