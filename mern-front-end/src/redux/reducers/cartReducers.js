import { cartTypes } from '../types';

const initialState = {
  cartItems: {},
  loading: false,
  error: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case cartTypes.ADD_TO_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case cartTypes.ADD_TO_CART_SUCCESS:
      console.log('add to cart');
      return {
        ...state,
        cartItems: action.payload.cartItems,
        loading: false,
      };
    case cartTypes.ADD_TO_CART_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    case cartTypes.RESET_CART:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
