import { SET_CURRENT_USER, GET_ALL_USERS, GET_ERRORS_ALLURS } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
	isAuthenticated: false,
	user: {},
	allusers: []
}

export default function(state = initialState, action ) {
	switch(action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			};
		case GET_ALL_USERS:
			return {
				...state,
				allusers: action.payload
			};
		case GET_ERRORS_ALLURS:
			return {
				...state,
				allusers: []
			};
		default: 
			return state;
	}
}