import authReducers from './authReducers';
import userReducers from './userReducers';
import orderReducers from './orderReducers';
import productReducers from './productReducers';
import categoryReducers from './categoryReducers';
import pageReducers from './pageReducers';

import { combineReducers } from 'redux';

// window.store.getState()

const rootReducer = combineReducers({
  auth: authReducers,
  user: userReducers,
  order: orderReducers,
  product: productReducers,
  category: categoryReducers,
  page: pageReducers,
});

export default rootReducer;
