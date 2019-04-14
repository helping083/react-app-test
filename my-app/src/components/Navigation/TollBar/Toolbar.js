import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../../SideDrawer/DrawerToggle/DrawerToggle';
const toolBar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClick}/>
        <div className={[classes.LogoStyling, classes.DesktopOnly].join(' ')}>
            <Logo/>
        </div>
       <nav className={classes.DesktopOnly}>
          <NavigationItems/>
        </nav>
    </header>
);

export default toolBar;