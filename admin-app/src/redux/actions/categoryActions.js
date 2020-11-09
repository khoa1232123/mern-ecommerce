import axios from '../../helpers/axios';
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
  return async (dispatch) => {
    dispatch({ type: categoryTypes.ADD_NEW_CATEGORY_REQUEST });
    try {
      const res = await axios.post('/category/create', form);
      if (res.status === 201) {
        dispatch(getAllCategory());
        dispatch({
          type: categoryTypes.ADD_NEW_CATEGORY_SUCCESS,
          payload: {
            category: res.data.category,
          },
        });
      } else {
        dispatch({
          type: categoryTypes.ADD_NEW_CATEGORY_FAILURE,
          payload: { error: res.data.error },
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const updatedCategories = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryTypes.UPDATE_CATEGORIES_REQUEST });
    const res = await axios.post('/category/update', form);
    if (res.status === 201) {
      dispatch(getAllCategory());
      dispatch({ type: categoryTypes.UPDATE_CATEGORIES_SUCCESS });
    } else {
      dispatch({
        type: categoryTypes.UPDATE_CATEGORIES_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const deleteCategories = (ids) => {
  return async (dispatch, getState) => {
    dispatch({ type: categoryTypes.DELETE_CATEGORIES_REQUEST });
    const res = await axios.post('/category/delete', {
      payload: {
        ids,
      },
    });
    if (res.status === 201) {
      dispatch({ type: categoryTypes.DELETE_CATEGORIES_SUCCESS });
      dispatch(getAllCategory());
    } else {
      dispatch({
        type: categoryTypes.DELETE_CATEGORIES_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
