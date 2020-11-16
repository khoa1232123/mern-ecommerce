import categoryReducers from './categoryReducers';
import productReducers from './productReducers';
import authReducers from './authReducers';
import { combineReducers } from 'redux';

// window.store.getState()

const rootReducer = combineReducers({
  category: categoryReducers,
  product: productReducers,
  auth: authReducers,
});

export default rootReducer;
