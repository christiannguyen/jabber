import React, { useState } from 'react';
import styled from 'styled-components';

const Input = styled.input`
	padding: 10px;
	width: 150px;
	border: 1px solid #dadee0;
`;

const Button = styled.button`
	padding: 10px 20px;
	background: #5978f3;
	color: #fff;
	&:hover {
		cursor: pointer;
	}
`;

function Search({ searchCb, dispatchSearched }) {
	const [jobInput, setJobInput] = useState('');
	const [locationInput, setLocationInput] = useState('');
	const [companyInput, setCompanyInput] = useState('');

	function handleJobSearchChange(e) {
		setJobInput(e.target.value);
	}

	function handleLocationSearchChange(e) {
		setLocationInput(e.target.value);
	}

	function handleSubmit() {
		let query = jobInput;
		const company = companyInput;
		if (company) {
			query = `${jobInput} company:${company}`;
		}
		console.log('query', query);
		searchCb({ query, location: locationInput });
		dispatchSearched({
			type: 'SET_SEARCH_JOBS_INPUT',
			payload: {
				query,
				location: locationInput,
			},
		});
	}

	function handleCompany(e) {
		setCompanyInput(e.target.value);
	}

	return (
		<div>
			<Input
				type="text"
				placeholder="Filter By Company"
				onChange={handleCompany}
				value={companyInput}
			/>
			<Input
				type="text"
				placeholder="Filter By Job Description"
				onChange={handleJobSearchChange}
				value={jobInput}
			/>
			<Input
				type="text"
				placeholder="Filter By Location"
				onChange={handleLocationSearchChange}
				value={locationInput}
			/>
			<Button onClick={handleSubmit}>Search</Button>
		</div>
	);
	// return <div className="Searchbar">{(response.loading && 'Loading...') || <p>he</p>}</div>;
}

export default Search;
