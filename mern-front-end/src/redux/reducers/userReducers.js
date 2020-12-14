import { userTypes } from '../types';

const initialState = {
  address: [],
  error: null,
  loading: false,
  orders: [],
  orderDetails: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case userTypes.GET_USER_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userTypes.GET_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        address: payload.address,
        loading: false,
      };
    case userTypes.GET_USER_ADDRESS_FAILURE:
      return {
        ...state,
        error: payload.error,
        loading: false,
      };
    case userTypes.ADD_USER_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userTypes.ADD_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        address: payload.address,
      };
    case userTypes.ADD_USER_ADDRESS_FAILURE:
      return {
        ...state,
        error: payload.error,
        loading: false,
      };
    case userTypes.GET_USER_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userTypes.GET_USER_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: payload.orders,
      };
    case userTypes.GET_USER_ORDER_FAILURE:
      return {
        ...state,
        error: payload.error,
        loading: false,
      };
    case userTypes.GET_USER_ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userTypes.GET_USER_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        orderDetails: payload.order,
      };
    case userTypes.GET_USER_ORDER_DETAILS_FAILURE:
      return {
        ...state,
        error: payload.error,
        loading: false,
      };
    default:
      return state;
  }
};
