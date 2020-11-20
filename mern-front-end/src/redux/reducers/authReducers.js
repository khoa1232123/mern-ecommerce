import { authTypes } from '../types';

const initState = {
  token: null,
  user: {
    firstName: '',
    lastName: '',
    email: '',
    picture: '',
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  message: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
  switch (action.type) {
    case authTypes.LOGIN_REQUEST:
      return {
        ...state,
        authenticating: true,
      };
    case authTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
    case authTypes.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case authTypes.LOGOUT_SUCCESS:
      return {
        ...initState,
        loading: false,
      };
    case authTypes.LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
