import axios from '../../helpers/axios';
import { productTypes } from '../types';

export const getProductsByCat = (slug) => {
  return async (dispatch) => {
    const res = await axios.get(`/product/getproductsbycat/${slug}`);
    if (res.status === 200) {
      dispatch({
        type: productTypes.GET_PRODUCTS_BY_CAT,
        payload: res.data,
      });
    } else {
    }
  };
};

export const getProductPage = ({ cid, type }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: productTypes.GET_PRODUCT_PAGE_REQUEST });
      const res = await axios.get(`/page/${cid}/${type}`);
      if (res.status === 200) {
        dispatch({
          type: productTypes.GET_PRODUCT_PAGE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: productTypes.GET_PRODUCT_PAGE_FAILURE,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductDetailsById = ({ productId }) => {
  return async (dispatch) => {
    dispatch({ type: productTypes.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
    let res;
    console.log(productId);
    try {
      res = await axios.get(`/product/${productId}`);
      if (res.status === 200) {
        dispatch({
          type: productTypes.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
          payload: { productDetails: res.data.product },
        });
      } else {
        dispatch({
          type: productTypes.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
          payload: { error: res.data.error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
