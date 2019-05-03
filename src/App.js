import React, { useState, useReducer } from 'react';
import './App.css';
import useAxios from './hooks/useAxios';
import axios from 'axios';
import Search from './components/search';
import JobPosting from './components/jobPosting';
import styled from 'styled-components';
import moment from 'moment';
import SearchMore from './components/searchMore';
import { initialSearchedState, searchedReducer } from './reducers';

const SearchContext = React.createContext();

const MainContainer = styled.div`
	margin: auto;
	align-items: center;
	display: flex;
	flex-direction: column;
	width: 80%;
	margin-top: 50px;
`;

const PostingContainer = styled.div`
	margin: auto;
	margin-top: 40px;
	width: 70%;
	display: flex;
	flex-wrap: wrap;
	/* text-align: center; */
`;

const initialJobState = {
	loading: false,
	jobPostings: [],
	errorMessage: null,
};

const jobReducer = (state, { type, payload }) => {
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
	const [searched, setSearched] = useState(false);
	const [state, dispatch] = useReducer(jobReducer, initialJobState);
	const [searchedState, dispatchSearched] = useReducer(searchedReducer, initialSearchedState);
	function searchJobs(searchData, additionalParams = {}) {
		const { location, query } = searchData;
		dispatch({
			type: 'SEARCH_JOBS_REQUEST',
		});
		axios
			.get('api/getData', {
				params: {
					location,
					query,
					...additionalParams,
				},
			})
			.then(res => {
				console.log('res is', res);
				dispatch({
					type: 'SEARCH_JOBS_SUCCESS',
					payload: res.data.jobPostings,
				});
				setSearched(true);
			})
			.catch(err => {
				dispatch({
					type: 'SEARCH_JOBS_FAILURE',
					payload: err,
				});
				setSearched(true);
			});
	}

	function renderPostings() {
		if (loading) {
			return <p>... loading</p>;
		} else if (errorMessage) {
			return <p>error: {errorMessage}</p>;
		} else if (jobPostings.length === 0 && searched) {
			return <p>No Jobs found :(</p>;
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
			<Search searchCb={searchJobs} dispatchSearched={dispatchSearched} />
			<PostingContainer>{renderPostings()}</PostingContainer>
			<SearchMore
				searchJobs={searchJobs}
				searchedState={searchedState}
				jobPostingsLength={jobPostings.length}
			/>
		</MainContainer>
	);
	// return <div className="App">{(response.loading && 'Loading...') || <p>he</p>}</div>;
}

export default App;
