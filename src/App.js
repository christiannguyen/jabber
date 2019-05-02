import React, { useState, useReducer } from 'react';
import logo from './logo.svg';
import './App.css';
import useAxios from './hooks/useAxios';
import rp from 'request-promise';
import axios from 'axios';
import Search from './components/search';
import JobPosting from './components/jobPosting';

const initialState = {
	loading: false,
	jobPostings: [],
	errorMessage: null,
};

const reducer = (state, { type, payload }) => {
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
				jobPostings: payload,
			};
		case 'SEARCH_JOBS_FAILURE':
			return {
				...state,
				loading: false,
				errorMessage: payload.error,
			};
		default:
			return state;
	}
};

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	function searchJobs(searchData) {
		const { location, job } = searchData;
		dispatch({
			type: 'SEARCH_JOBS_REQUEST',
		});
		// fetch(`api/getData?location=${location}&job=${job}`)
		axios
			.get('api/getData', {
				params: {
					location,
					job,
				},
			})
			.then(res => {
				console.log('res is', res);
				dispatch({
					type: 'SEARCH_JOBS_SUCCESS',
					payload: res.data.jobPostings,
				});
			})
			.catch(err => {
				dispatch({
					type: 'SEARCH_JOBS_FAILURE',
					payload: err,
				});
			});
	}

	function renderPostings() {
		if (loading) {
			return <p>... loading</p>;
		} else if (errorMessage) {
			return <p>error: {errorMessage}</p>;
		} else {
			console.log('job postings', jobPostings);
			return jobPostings.map(job => <JobPosting />);
		}
	}

	const { jobPostings, loading, errorMessage } = state;
	console.log('state is', state);

	return (
		<div>
			<Search searchCb={searchJobs} />
			{/* <div>{renderPostings()}</div> */}
			<JobPosting />
		</div>
	);
	// return <div className="App">{(response.loading && 'Loading...') || <p>he</p>}</div>;
}

export default App;
