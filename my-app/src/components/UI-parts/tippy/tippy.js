import React from 'react';
import Tippy from '@tippy.js/react';
import classes from './tippy.css';


// Import the Google theme from tippy.js
import 'tippy.js/themes/google.css';

const tippy = (props) => {
    return (
      <Tippy
        content={props.tippyData}
        placement="top"
        animation="scale"
        theme="google"
        animateFill={false}
        duration={[250, 175]}
        delay={[150, 0]}
        distance={8}
        arrow= 'true'
        trigger='click mouseenter'   
      >
        <button className={classes.buttonClass}>{props.children}</button>
      </Tippy>
    );
};
export default tippy;