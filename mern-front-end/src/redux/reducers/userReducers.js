import { userTypes } from '../types';

const initialState = {
  address: [],
  error: null,
  loading: false,
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
      };
    default:
      return state;
  }
};