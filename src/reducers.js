export const initialSearchedState = {
	query: '',
	location: '',
};

export const searchedReducer = (state, { type, payload }) => {
	switch (type) {
		case 'SET_SEARCH_JOBS_INPUT':
			return {
				query: payload.query,
				location: payload.location,
			};
		default:
			return state;
	}
};
