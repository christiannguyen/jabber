import React, { useState, useReducer } from 'react';
import './App.css';
import useAxios from './hooks/useAxios';
import axios from 'axios';
import Search from './components/search';
import JobPosting from './components/jobPosting';
import styled from 'styled-components';
import moment from 'moment';

const MainContainer = styled.div`
	margin: auto;
	align-items: center;
	display: flex;
	flex-direction: column;
	width: 80%;
`;

const PostingContainer = styled.div`
	margin: auto;
	margin-top: 40px;
	width: 70%;
	/* text-align: center; */
`;

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
			jobPostings.sort((a, b) => {
				return moment(b.date) - moment(a.date);
			});
			return jobPostings.map(({ company, date, url, location, title, description }) => (
				<JobPosting
					company={company}
					date={date}
					url={url}
					location={location}
					title={title}
					description={description}
				/>
			));
		}
	}

	const { jobPostings, loading, errorMessage } = state;
	console.log('state is', state);

	return (
		<MainContainer>
			<Search searchCb={searchJobs} />
			<PostingContainer>{renderPostings()}</PostingContainer>
			{/* <JobPosting /> */}
		</MainContainer>
	);
	// return <div className="App">{(response.loading && 'Loading...') || <p>he</p>}</div>;
}

export default App;
