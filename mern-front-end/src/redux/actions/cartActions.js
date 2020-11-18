import { cartTypes } from '../types';
// import store from '../store';

export const addToCart = (product, quantity = 1) => {
  return async (dispatch, getState) => {
    console.log(getState);
    const { cartItems } = getState().cart;
    const qty = cartItems[product._id]
      ? parseInt(cartItems[product._id].qty) + quantity
      : 1;
    console.log({ qty, product });
    cartItems[product._id] = {
      ...product,
      qty,
    };
    localStorage.setItem('cart', JSON.stringify(cartItems));
    console.log('cart Items', cartItems);
    dispatch({
      type: cartTypes.ADD_TO_CART,
      payload: { cartItems },
    });
  };
};

export const updateCart = () => {
  return async (dispatch) => {
    const cartItems = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : null;
    if (cartItems) {
      dispatch({
        type: cartTypes.ADD_TO_CART,
        payload: { cartItems },
      });
    }
  };
};
