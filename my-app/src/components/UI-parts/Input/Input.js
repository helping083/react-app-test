import React from "react";
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;

    switch (props.elementhType) {
        case ('input'):
          inputElement = 
            <input 
              className={classes.InputElement} 
              {...props.elementConfig}
              value={props.value}
              onChange={props.changed}
            />
          break;
        case ('textarea'):
          inputElement = 
            <textarea 
              className={classes.InputElement} 
              {...props.elementConfig}
              value={props.value}
              onChange={props.changed}
            />;
          break;
        case ('select'):
          inputElement = (
            <select
              className={classes.InputElement}
              value={props.value}
              onChange={props.changed}
            >
              {props.elementConfig.options.map((item, index)=>{
                return (
                  <option
                    value={item.value}
                    key={'select'+index}
                  >
                    {item.displayValue}
                  </option>
                );
              })}
            </select>
          );
          break; 
        default:
          inputElement = 
            <input 
              className={classes.InputElement} 
              onChange={props.changed}
              {...props.elementConfig}
              value={props.value}
            />; 
    }

    return (
      <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
      </div>
    );
}
    


export default input