import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
const SearchMoreWrapper = styled.div``;

function SearchMore({ searchJobs, jobPostingsLength, searchedState }) {
	function handleClick() {
		const additionalParams = {
			start: jobPostingsLength,
		};
		searchJobs(searchedState, additionalParams);
	}

	console.log('from search more', searchedState);
	return (
		<SearchMoreWrapper>
			<button onClick={handleClick}>Search More</button>
		</SearchMoreWrapper>
	);
}

SearchMore.propTypes = {
	jobDetails: PropTypes.object,
};

SearchMore.defaultProps = {
	company: 'company',
	date: 'date',
	url: 'url',
	location: 'location',
	title: 'title',
	description: 'descript',
};

export default SearchMore;
