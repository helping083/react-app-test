import React from 'react'
import classes from './Order.css';

const order = (props) => {
  const ingredients = [];
  for (let key in props.ingredients) {
    ingredients.push(
      {
        name: key,
        amount: props.ingredients[key]
      }
    );
  }
  const output = ingredients.map((item, index) => {
    return (
      <span
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0px 8px',
          border: '1px solid #ccc',
          padding: '5px'
        }}
        key={'ingOutput' + index}> {item.name} ({item.amount}) </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {output}</p>
      <p>Price: <strong>{props.price}</strong></p>
    </div>
  );
};

export default order;