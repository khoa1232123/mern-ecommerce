import { cartTypes } from '../types';

const initialState = {
  cartItems: {
    // 123: {
    //   _id: 123,
    //   name: 'sam sung s50',
    //   img: 'SVGZoomEvent.jpg',
    //   price: 2000,
    //   qty: 1,
    // },
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case cartTypes.ADD_TO_CART:
      console.log('add to cart');
      return {
        ...state,
        cartItems: action.payload.cartItems,
      };

    default:
      return state;
  }
};
