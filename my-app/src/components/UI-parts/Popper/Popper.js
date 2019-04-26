import React, { Component } from 'react';
import PopperJS from 'popper.js';
import classes from './Popper.css';

class PopperLoader extends Component {
    // setup a dummy position on init
    constructor(props) {
      super(props);
      this.popper= React.createRef();
      this.reference = React.createRef();
      this.arrow = React.createRef();
      this.state = {
        isShow: false, 
        data: { 
          offsets: { 
            popper: { 
              top: 0, left: 0 
            } 
          } 
        },
        // configuration: {
        //     placement: 'bottom'
        // } 
      };
    }
    
    componentDidMount() {
        var _this = this;
        var poppers = new PopperJS(this.reference.current, this.popper.current, 
             {
                placement: 'bottom',
                modifiers: {
                    flip: {
                        behavior: ['left', 'bottom', 'top', 'right']
                    },
                },
            });
            window.requestAnimationFrame(function() {
                poppers.options.onUpdate();
            });
            poppers.options.onUpdate(function(data) {
                console.log('data',data)
                _this.setState({data: data});
            });    
        console.log(poppers); 
    }
    popperShow = () =>{
        this.setState({isShow: true});
    }
    poperHide = ()=> {
        this.setState({isShow: false})
    }
    render() {
        var css = {
            transform: 'translate3d(' + this.state.data.offsets.popper.left + 'px, ' + this.state.data.offsets.popper.top + 'px, 0)',
            position: 'fixed',
            top: 0,
            left: 0
          }
        return (
            <div>
                <div
                  onMouseEnter={this.popperShow}
                  onMouseLeave={this.poperHide}    
                  className={classes.reference} 
                  ref={this.reference}>ref</div>
                <div 
                  className={classes.popper}
                  style={{
                      display: this.state.isShow?"block": 'none',
                      zIndex: this.state.isShow?10000: 0
                  }}
                  ref={this.popper} 
                  role="tooltip">
                  pop<span ref={this.arrow}  x-arrow="true"></span>
                </div>
            </div>
        );
    }
}
export default PopperLoader;