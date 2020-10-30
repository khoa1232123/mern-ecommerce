import axios from '../../helpers';
import { productTypes } from '../types';

export const getProductsByCat = (slug) => {
  return async (dispatch) => {
    const res = await axios.get(`/product/getproductsbycat/${slug}`);
    if (res.status === 200) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_PRODUCTS_BY_CAT,
        payload: res.data,
      });
    } else {
    }
  };
};
