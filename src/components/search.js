import React, { useState } from 'react';
import Creatable from 'react-select/lib/Creatable';
import styled from 'styled-components';

const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' },
];

function Search({ searchCb }) {
	const [searchJobTerm, setJobSearchTerm] = useState('');
	const [searchLocationTerm, setLocationSearchTerm] = useState('');
	const [companyInput, setCompanyInput] = useState('');

	function handleJobSearchChange(e) {
		setJobSearchTerm(e.target.value);
	}

	function handleLocationSearchChange(e) {
		setLocationSearchTerm(e.target.value);
	}

	function handleSubmit() {
		let query = searchJobTerm;
		const company = companyInput;
		if (company) {
			query = `${searchJobTerm} company:${company}`;
		}
		console.log('query', query);
		searchCb({ job: query, location: searchLocationTerm });
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
			{/* <Creatable
				isClearable
				// menuIsOpen={false}
				placeholder="Filter by Company"
				value={companyInput}
				options={options}
				onBlur={handleBlur}
				onBlurResetsInput={false}
				onCreateOption={handleCreate}
				onChange={handleCompany}
			/> */}
			{/* <Creatable
				label="Hello"
				isClearable
				menuIsOpen={false}
				placeholder="Filter by Company"
				value={companyInput}
				options={options}
				onBlur={handleBlur}
				onBlurResetsInput={false}
				onCreateOption={handleCreate}
				onChange={handleCompany}
			/>
			<Creatable
				label="Hello"
				isClearable
				menuIsOpen={false}
				placeholder="Filter by Company"
				value={companyInput}
				options={options}
				onBlur={handleBlur}
				onBlurResetsInput={false}
				onCreateOption={handleCreate}
				onChange={handleCompany}
			/> */}
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
				value={searchJobTerm}
			/>
			<input
				type="text"
				placeholder="Filter By Location"
				onChange={handleLocationSearchChange}
				value={searchLocationTerm}
			/>
			<button onClick={handleSubmit}>Search</button>
		</div>
	);
	// return <div className="Searchbar">{(response.loading && 'Loading...') || <p>he</p>}</div>;
}

export default Search;
