import React from 'react'
import Auxialury from '../../hoc/auxuilary/Auxialury';
import classes from './Layount.css';
import Toolbar from '../../components/Navigation/TollBar/Toolbar';
const Layout = (props) => (
 <Auxialury>
    <Toolbar/>
    <main className={classes.Content}>
      {props.children}
    </main>
 </Auxialury>   
);

export default Layout;