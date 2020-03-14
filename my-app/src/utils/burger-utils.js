export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };

};

export const calcBurgerHeight = (burger) => {
  let a = document.querySelector('.Burger');
  console.log('document', burger.current)
}