import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
const SearchMoreWrapper = styled.div``;

function SearchMore({ searchJobs, jobPostings }) {
	function handleClick() {
		searchJobs();
	}
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
