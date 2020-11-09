import axios from '../../helpers/axios';
import { userTypes } from '../types';

export const signup = (user) => {
  return async (dispatch) => {
    dispatch({
      type: userTypes.USER_REGISTER_REQUEST,
    });
    const res = await axios.post(`/admin/signup`, {
      ...user,
    });
    console.log('abc signup');
    if (res.status === 201) {
      const { message } = res.data;
      dispatch({
        type: userTypes.USER_REGISTER_SUCCESS,
        payload: { message },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userTypes.USER_REGISTER_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    }
  };
};
