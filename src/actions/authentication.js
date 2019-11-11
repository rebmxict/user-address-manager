import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER, GET_ALL_USERS, GET_ERRORS_ALLURS } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (user, history) => dispatch => {
	axios.post('/api/users/register', user)
	.then(res => history.push('/login'))
	.catch(err => {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	});
}

export const loginUser = user => dispatch => {
	axios.post('/api/users/login', user)
	.then(res => {
		const { token } = res.data;
		localStorage.setItem('jwtToken', token);
		setAuthToken(token);
		const decoded = jwt_decode(token);
		dispatch(setCurrentUser(decoded));
	})
	.catch(err => {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	});
}

export const getAllUsers = () => dispatch => {
	axios.get('/api/users/allusers')
	.then(res => {
		dispatch({
			type: GET_ALL_USERS,
			payload: res.data
		});
	})
	.catch(err => {
		dispatch({
			type: GET_ERRORS_ALLURS,
			payload: err.response.data
		});
	});
}

export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	}
}

export const logoutUser = history => dispatch => {
	localStorage.removeItem('jwtToken');
	setAuthToken(false);
	dispatch(setCurrentUser({}));
	history.push('/login');
}