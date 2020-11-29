import axios from '../../helpers/axios';
import {
  categoryTypes,
  initialDataTypes,
  orderTypes,
  productTypes,
} from '../types';

export const getInitialData = () => {
  return async (dispatch) => {
    dispatch({
      type: initialDataTypes.GET_ALL_INITIAL_DATA_REQUEST,
    });
    const res = await axios.post('/initialdata');
    if (res.status === 200) {
      const { categories, products, orders } = res.data;
      dispatch({
        type: categoryTypes.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories },
      });
      dispatch({
        type: productTypes.GET_ALL_PRODUCTS_SUCCESS,
        payload: { products },
      });
      dispatch({
        type: orderTypes.GET_CUSTOMER_ORDER_SUCCESS,
        payload: { orders },
      });
    }
  };
};
