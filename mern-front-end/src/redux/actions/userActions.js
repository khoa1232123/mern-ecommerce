import { userTypes } from '../types';
import axios from '../../helpers/axios';

export const getAddress = () => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/user/address/getaddress');
      dispatch({ type: userTypes.GET_USER_ADDRESS_REQUEST });
      if (res.status === 200) {
        const {
          userAddress: { address },
        } = res.data;
        dispatch({
          type: userTypes.GET_USER_ADDRESS_SUCCESS,
          payload: { address },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userTypes.GET_USER_ADDRESS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addAddress = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/user/address/create', { payload });
      dispatch({ type: userTypes.ADD_USER_ADDRESS_REQUEST });
      if (res.status === 201) {
        console.log(res);
        const {
          address: { address },
        } = res.data;
        dispatch({
          type: userTypes.ADD_USER_ADDRESS_SUCCESS,
          payload: { address },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userTypes.ADD_USER_ADDRESS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addOrder = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/order/addorder', payload);
      dispatch({ type: userTypes.ADD_USER_ORDER_REQUEST });
      if (res.status === 201) {
        console.log(res);
        // const {
        //   address: { address },
        // } = res.data;
        // dispatch({
        //   type: userTypes.ADD_USER_ORDER_SUCCESS,
        //   payload: { address },
        // });
      } else {
        const { error } = res.data;
        dispatch({
          type: userTypes.ADD_USER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
