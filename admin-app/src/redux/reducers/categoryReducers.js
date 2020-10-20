import { categoryTypes } from '../types';

const initState = {
  categories: [],
  loading: false,
  error: null,
};

const buildNewCategories = (categories, category) => {
  let myCategories = [];
  for (let cat of categories) {
    myCategories.push({
      ...cat,
      children:
        cat.children && cat.children.length > 0
          ? buildNewCategories(cat.children, category)
          : [],
    });
  }
};

export default (state = initState, action) => {
  switch (action.type) {
    case categoryTypes.GET_ALL_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoryTypes.GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories,
        loading: false,
      };
    case categoryTypes.GET_ALL_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case categoryTypes.ADD_NEW_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoryTypes.ADD_NEW_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: buildNewCategories(
          state.categories,
          action.payload.categories
        ),
        loading: false,
      };
    case categoryTypes.GET_ALL_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
