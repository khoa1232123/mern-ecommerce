import { productTypes } from '../types';

const initState = {
  products: [],
  productsByPrice: {
    under5k: [],
    under10k: [],
    under15k: [],
    under20k: [],
    under30k: [],
  },
  error: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
  switch (action.type) {
    case productTypes.GET_PRODUCTS_BY_CAT:
      return {
        ...state,
        products: action.payload.products,
        productsByPrice: {
          ...action.payload.productsByPrice,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
