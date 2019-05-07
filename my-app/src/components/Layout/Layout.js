import React, {Component} from 'react';
import { connect } from 'react-redux'
import Auxialury from '../../hoc/auxuilary/Auxialury';
import classes from './Layount.css';
import Toolbar from '../../components/Navigation/TollBar/Toolbar';
import Sidedrawer from '../SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  sidedrawerClosed = () => {
    this.setState({showSideDrawer:false});
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
          isAuth={this.props.isAuth}
          drawerToggleClick = {this.drawerToggle}/>
        <Sidedrawer 
          isAuth={this.props.isAuth}
          open={this.state.showSideDrawer} 
          closed={this.sidedrawerClosed}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Auxialury>  
    );
  }
} 

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !==null
  }
}

export default connect(mapStateToProps)(Layout);