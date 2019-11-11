import axios from 'axios';
import { GET_USER_ADDRESS, GET_ERRORS } from './types';

export const getUserAddress = () => dispatch => {
	axios.get('/api/users/address')
	.then(res => {
		dispatch({
			type: GET_USER_ADDRESS,
			payload: res.data
		});
	})
	.catch(err => {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	});
}

export const registerAddress = address => dispatch => {
	axios.post('/api/users/regaddr', address)
	.then(res => {
		dispatch(getUserAddress());
	})
	.catch(err => {
	});
}