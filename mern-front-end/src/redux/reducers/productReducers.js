import { productTypes } from '../types';

const initState = {
  products: [],
  loading: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case productTypes.GET_ALL_PRODUCTS_REQUEST:
      return {
        ...state,
      };
    case productTypes.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
      };
    default:
      return {
        ...state,
      };
  }
};
