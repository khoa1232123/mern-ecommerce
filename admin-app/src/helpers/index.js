import axios from 'axios';
import { api } from '../urlConfig';

const token = window.localStorage.getItem('token');

const axiosIntance = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});

axiosIntance.interceptors.request.use((req) => {
  return req;
});

axiosIntance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    console.log(error.response);
    return Promise.reject(error);
  }
);

export default axiosIntance;
