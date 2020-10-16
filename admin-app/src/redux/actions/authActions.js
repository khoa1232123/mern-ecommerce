import axios from '../../helpers';
import { LOGIN_REQUEST, LOGIN_SUCCESS } from '../types';

export const login = (user) => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });
    const res = await axios.post(`/admin/signin`, {
      ...user,
    });
    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token, user },
      });
    }
    dispatch({
      type: LOGIN_REQUEST,
      payload: {
        ...user,
      },
    });
  };
};
