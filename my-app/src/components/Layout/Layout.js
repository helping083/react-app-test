import React from 'react'
import Auxialury from '../../hoc/auxuilary/Auxialury';
import classes from './Layount.css';

const Layout = (props) => (
 <Auxialury>
    <div>
      toolbar,sidebar,navbar
    </div>
    <main className={classes.Content}>
      {props.children}
    </main>
 </Auxialury>   
);

export default Layout;