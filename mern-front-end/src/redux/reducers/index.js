import categoryReducers from './categoryReducers';
import { combineReducers } from 'redux';

// window.store.getState()

const rootReducer = combineReducers({
  category: categoryReducers,
});

export default rootReducer;
