import categoryReducers from './categoryReducers';
import productReducers from './productReducers';
import authReducers from './authReducers';
import cartReducers from './cartReducers';
import userReducers from './userReducers';
import { combineReducers } from 'redux';

// window.store.getState()

const rootReducer = combineReducers({
  category: categoryReducers,
  product: productReducers,
  auth: authReducers,
  cart: cartReducers,
  user: userReducers,
});

export default rootReducer;
