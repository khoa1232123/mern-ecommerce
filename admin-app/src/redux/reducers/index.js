import authReducer from './authReducer';
import { combineReducers } from 'redux';
import userReducer from './userReducer';

// window.store.getState()

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;
