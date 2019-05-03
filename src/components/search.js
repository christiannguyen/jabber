import React, { useState } from 'react';
import styled from 'styled-components';

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

	// function handleCreate(value) {
	// 	console.log('value', value);
	// 	setCompanyInput({ value, label: value });
	// }
	// function handleBlur(event) {
	// 	handleCreate(event.target.value);
	// }
	function handleCompany(e) {
		setCompanyInput(e.target.value);
	}

	return (
		<div>
			<input
				type="text"
				placeholder="Filter By Company"
				onChange={handleCompany}
				value={companyInput}
			/>
			<input
				type="text"
				placeholder="Filter By Job Description"
				onChange={handleJobSearchChange}
				value={jobInput}
			/>
			<input
				type="text"
				placeholder="Filter By Location"
				onChange={handleLocationSearchChange}
				value={locationInput}
			/>
			<button onClick={handleSubmit}>Search</button>
		</div>
	);
	// return <div className="Searchbar">{(response.loading && 'Loading...') || <p>he</p>}</div>;
}

export default Search;
