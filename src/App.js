import React, { useState, useReducer } from 'react';
import './App.css';
import useAxios from './hooks/useAxios';
import axios from 'axios';
import Search from './components/search';
import JobPosting from './components/jobPosting';
import styled from 'styled-components';
import moment from 'moment';
import { initialSearchedState, searchedReducer, initialJobState, jobReducer } from './reducers';
import Pagination from 'react-js-pagination';
// require('bootstrap/less/bootstrap.less');

const MULTIPLIER = 20;

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
`;

function App() {
	const [searched, setSearched] = useState(false);
	const [page, setPage] = useState(1);
	const [state, dispatch] = useReducer(jobReducer, initialJobState);
	const [searchedState, dispatchSearched] = useReducer(searchedReducer, initialSearchedState);

	function searchJobs(searchData, type) {
		const { location, query } = searchData;
		let pageCopy = page;
		console.log('page is', pageCopy);
		if (type !== 'more') {
			setPage(1);
			pageCopy = 1;
		}
		dispatch({
			type: 'SEARCH_JOBS_REQUEST',
		});
		axios
			.get('api/getData', {
				params: {
					location,
					query,
					start: (pageCopy - 1) * MULTIPLIER,
				},
			})
			.then(res => {
				console.log('res is', res);
				dispatch({
					type: 'SEARCH_JOBS_SUCCESS',
					payload: {
						jobPostings: res.data.jobPostings,
						totalResults: res.data.totalResults,
					},
				});
				if (!searched) setPage(1);
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
	function handlePageChange(pageNumber) {
		console.log(`active page is ${pageNumber}`);
		searchJobs(searchedState);
		setPage(pageNumber, 'more');
	}

	const { jobPostings, loading, errorMessage, totalResults } = state;
	console.log('state is', state);

	return (
		<MainContainer>
			<Search searchCb={searchJobs} dispatchSearched={dispatchSearched} />
			<PostingContainer>{renderPostings()}</PostingContainer>
			{searched && !loading && (
				<Pagination
					activePage={page}
					itemsCountPerPage={20}
					totalItemsCount={totalResults}
					pageRangeDisplayed={5}
					onChange={handlePageChange}
				/>
			)}
		</MainContainer>
	);
}

export default App;
