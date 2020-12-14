import axios from '../../helpers/axios';
import { orderTypes } from '../types';

export const getCustomerOrders = () => {
  return async (dispatch) => {
    dispatch({ type: orderTypes.GET_CUSTOMER_ORDER_REQUEST });
    try {
      const res = await axios.post('/admin/order/getCustomerOrders');
      if (res.status === 200) {
        const { orders } = res.data;
        dispatch({
          type: orderTypes.GET_CUSTOMER_ORDER_SUCCESS,
          payload: { orders },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: orderTypes.GET_CUSTOMER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateOrder = (payload) => {
  return async (dispatch) => {
    dispatch({ type: orderTypes.UPDATE_CUSTOMER_ORDER_REQUEST });
    try {
      const res = await axios.post('/admin/order/update', payload);
      console.log(res);
      if (res.status === 201) {
        // console.log('1');
        dispatch({ type: orderTypes.UPDATE_CUSTOMER_ORDER_SUCCESS });
        dispatch(getCustomerOrders());
      } else {
        const { error } = res.data;
        dispatch({
          type: orderTypes.UPDATE_CUSTOMER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
