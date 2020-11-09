import axios from '../../helpers/axios';
import { authTypes } from '../types';

export const login = (user) => {
  return async (dispatch) => {
    dispatch({
      type: authTypes.LOGIN_REQUEST,
    });
    const res = await axios.post(`/admin/signin`, {
      ...user,
    });
    console.log(res);
    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({
        type: authTypes.LOGIN_SUCCESS,
        payload: { token, user },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authTypes.LOGIN_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'));
      dispatch({
        type: authTypes.LOGIN_SUCCESS,
        payload: { token, user },
      });
    } else {
      dispatch({
        type: authTypes.LOGIN_FAILURE,
        payload: {
          error: 'Falsed to login',
        },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authTypes.LOGOUT_REQUEST });
    const res = await axios.post('/admin/signout');
    if (res.status === 200) {
      localStorage.clear();
      dispatch({
        type: authTypes.LOGOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: authTypes.LOGOUT_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
