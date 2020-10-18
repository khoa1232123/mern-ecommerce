import authReducers from './authReducers';
import userReducers from './userReducers';
import orderReducers from './orderReducers';
import productReducers from './productReducers';
import categoryReducers from './categoryReducers';
import { combineReducers } from 'redux';

// window.store.getState()

const rootReducer = combineReducers({
  auth: authReducers,
  user: userReducers,
  order: orderReducers,
  product: productReducers,
  category: categoryReducers,
});

export default rootReducer;
