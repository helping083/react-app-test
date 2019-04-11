import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder';

const burger = (props) => {
    let transIngredients = Object.keys(props.ingredients)
      .map((item) => {
        return [...Array(props.ingredients[item])]
          .map((i,index) => {
            return <BurgerIngredient key={item+index} type={item}/>
          });
      }).reduce((prev,curr)=>{
          return prev.concat(curr);
      },[]);
      if (transIngredients.length===0) {
          transIngredients = <p>add ingredients</p>
      }
    return (
        <div className={classes.Burger}>
        <BurgerIngredient type={'bread-top'}/>
            {transIngredients}
        <BurgerIngredient type={'bread-bottom'}/>
        </div>
    );
};

export default burger;