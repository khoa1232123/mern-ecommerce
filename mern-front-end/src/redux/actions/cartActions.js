// import { getCartItems } from '../../../../mern-back-end/src/controller/cart';
import axios from '../../helpers';
import { cartTypes } from '../types';
// import store from '../store';

export const getCartItems = () => {
  return async (dispatch) => {
    console.log('abc get cart items');
    try {
      dispatch({ type: cartTypes.ADD_TO_CART_REQUEST });
      const res = await axios.post('/cart/user/getCartItems');
      if (res.status === 200) {
        const { cartItems } = res.data;
        console.log({ getCartItems: cartItems });
        if (cartItems) {
          dispatch({
            type: cartTypes.ADD_TO_CART_SUCCESS,
            payload: { cartItems },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addToCart = (product, quantity = 1) => {
  return async (dispatch, getState) => {
    console.log(getState);
    const {
      cart: { cartItems },
      auth,
    } = getState();
    const qty = cartItems[product._id]
      ? parseInt(cartItems[product._id].qty) + quantity
      : 1;

    console.log({ qty, product });
    cartItems[product._id] = {
      ...product,
      qty,
    };
    if (auth.authenticate) {
      dispatch({ type: cartTypes.ADD_TO_CART_REQUEST });
      const payload = {
        cartItems: [
          {
            product: product._id,
            quantity: qty,
          },
        ],
      };
      console.log(payload);
      const res = await axios.post('/cart/addtocart', payload);
      console.log(res);
      if (res.status === 201) {
        dispatch(getCartItems());
      }
    } else {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
    console.log('cart Items', cartItems);
    dispatch({
      type: cartTypes.ADD_TO_CART,
      payload: { cartItems },
    });
  };
};

export const updateCart = () => {
  return async (dispatch, getState) => {
    const { auth } = getState();
    const cartItems = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : null;
    if (auth.authenticate) {
      localStorage.removeItem('cart');

      if (cartItems) {
        const payload = {
          cartItems: Object.keys(cartItems).map((key, index) => {
            return {
              quantity: cartItems[key].qty,
              product: cartItems[key]._id,
            };
          }),
        };
        if (Object.keys(cartItems).length > 0) {
          const res = await axios.post('/cart/addtocart', payload);
          if (res.status === 201) {
            dispatch(getCartItems());
          }
        }
        dispatch({
          type: cartTypes.ADD_TO_CART,
          payload: { cartItems },
        });
      }
    }
  };
};
