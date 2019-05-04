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

export const initialJobState = {
	loading: false,
	jobPostings: [],
	errorMessage: null,
	totalResults: 0,
};

export const jobReducer = (state, { type, payload }) => {
	switch (type) {
		case 'SEARCH_JOBS_REQUEST':
			return {
				...state,
				loading: true,
				errorMessage: null,
			};
		case 'SEARCH_JOBS_SUCCESS':
			return {
				...state,
				loading: false,
				jobPostings: payload.jobPostings,
				totalResults: payload.totalResults,
			};
		case 'SEARCH_JOBS_FAILURE':
			return {
				...state,
				loading: false,
				errorMessage: payload.error,
			};
		case 'SEARCH_MORE_SUCCESS':
			return {
				...state,
				loading: false,
				jobPostings: [...state.jobPostings, payload],
			};
		default:
			return state;
	}
};
