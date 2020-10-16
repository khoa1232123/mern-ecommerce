import authReducers from './authReducers';
import { combineReducers } from 'redux';

// window.store.getState()

const rootReducer = combineReducers({
  auth: authReducers,
});

export default rootReducer;
