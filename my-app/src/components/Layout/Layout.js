import React, {Component} from 'react'
import Auxialury from '../../hoc/auxuilary/Auxialury';
import classes from './Layount.css';
import Toolbar from '../../components/Navigation/TollBar/Toolbar';
import Sidedrawer from '../SideDrawer/SideDrawer';
class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  sidedrawerClosed = () => {
    this.setState({showSideDrawer:false})
    console.log(this.state.showSideDrawer)
  }
  drawerToggle = () => {
    this.setState((prevState)=>{
      return {showSideDrawer: !prevState.showSideDrawer}
    });
  }
  render() {
    return(
      <Auxialury>
        <Toolbar
          drawerToggleClick = {this.drawerToggle}/>
        <Sidedrawer 
          open={this.state.showSideDrawer} 
          closed={this.sidedrawerClosed}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Auxialury>  
    );
  }
} 
export default Layout;