import categoryReducers from './categoryReducers';
import productReducers from './productReducers';
import { combineReducers } from 'redux';

// window.store.getState()

const rootReducer = combineReducers({
  category: categoryReducers,
  product: productReducers,
});

export default rootReducer;
