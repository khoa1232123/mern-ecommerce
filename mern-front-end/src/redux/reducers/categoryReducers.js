import { categoryTypes } from '../types';

const initState = {
  categories: [],
  loading: false,
  error: null,
};

const buildNewCategories = (parentId, categories, category) => {
  let myCategories = [];
  for (let cat of categories) {
    if (cat._id === parentId) {
      myCategories.push({
        ...cat,
        children:
          cat.children && cat.children.length > 0
            ? buildNewCategories(
                parentId,
                [
                  ...cat.children,
                  {
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children,
                  },
                ],
                category
              )
            : [],
      });
    } else {
      myCategories.push({
        ...cat,
        children:
          cat.children && cat.children.length > 0
            ? // eslint-disable-next-line no-unused-vars
              buildNewCategories(parentId, cat.children, category)
            : [],
      });
    }
  }
  return myCategories;
};

// eslint-disable-next-line import/no-anonymous-default-export
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
      // const category = action.payload.category;
      // const updateCat = buildNewCategories(
      //   category.parentId,
      //   state.categories,
      //   category
      // );
      // console.log(updateCat);
      return {
        ...state,
        // categories: updateCat,
        loading: false,
      };
    case categoryTypes.ADD_NEW_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
