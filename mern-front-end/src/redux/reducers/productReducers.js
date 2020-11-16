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
  pageRequest: false,
  page: {},
  loading: false,
  productDetails: {},
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
    case productTypes.GET_PRODUCT_PAGE_REQUEST:
      return {
        ...state,
        pageRequest: true,
      };
    case productTypes.GET_PRODUCT_PAGE_SUCCESS:
      return {
        ...state,
        pageRequest: false,
        page: action.payload.page,
      };
    case productTypes.GET_PRODUCT_PAGE_FAILURE:
      return {
        ...state,
        pageRequest: false,
        error: action.payload.error,
      };
    case productTypes.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productTypes.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        productDetails: action.payload.productDetails,
      };
    case productTypes.GET_PRODUCT_DETAILS_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
