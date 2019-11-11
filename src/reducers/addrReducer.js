import { GET_USER_ADDRESS } from '../actions/types';

const initialState = {
	address: {}
}

export default function(state = initialState, action ) {
	switch(action.type) {
		case GET_USER_ADDRESS:
			return {
				...state,
				address: action.payload
			};
		default: 
			return state;
	}
}