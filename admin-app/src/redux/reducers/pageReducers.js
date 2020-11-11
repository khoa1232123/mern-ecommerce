import { pageTypes } from '../types';

const initState = {
  pages: [],
  loading: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case pageTypes.CREATE_PAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case pageTypes.CREATE_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case pageTypes.CREATE_PAGE_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
};
