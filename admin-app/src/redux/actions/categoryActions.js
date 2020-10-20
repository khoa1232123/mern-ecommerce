import axios from '../../helpers';
import { categoryTypes } from '../types';

export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryTypes.GET_ALL_CATEGORIES_REQUEST });
    const res = await axios.get('/category/getcategories');
    console.log(res);
    if (res.status === 200) {
      dispatch({
        type: categoryTypes.GET_ALL_CATEGORIES_SUCCESS,
        payload: {
          categories: res.data.categoryList,
        },
      });
    } else {
      dispatch({
        type: categoryTypes.GET_ALL_CATEGORIES_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const addCategory = (form) => {
  return async (dispatch, getState) => {
    dispatch({ type: categoryTypes.ADD_NEW_CATEGORY_REQUEST });
    const res = await axios.post('/category/create', form);
    if (res.status === 201) {
      dispatch({
        type: categoryTypes.ADD_NEW_CATEGORY_SUCCESS,
        payload: {
          categories: res.data.category,
        },
      });
    } else {
      dispatch({
        type: categoryTypes.ADD_NEW_CATEGORY_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
