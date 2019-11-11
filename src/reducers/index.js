import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import addrReducer from './addrReducer';

export default combineReducers({
	errors: errorReducer,
	auth: authReducer,
	addr: addrReducer
});