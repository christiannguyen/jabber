import React, { useState } from 'react';

function Search({ searchCb }) {
	const [searchJobTerm, setJobSearchTerm] = useState('');
	const [searchLocationTerm, setLocationSearchTerm] = useState('');

	function handleJobSearchChange(e) {
		setJobSearchTerm(e.target.value);
	}

	function handleLocationSearchChange(e) {
		setLocationSearchTerm(e.target.value);
	}

	function handleSubmit() {
		searchCb({ job: searchJobTerm, location: searchLocationTerm });
		setJobSearchTerm('');
		setLocationSearchTerm('');
	}

	return (
		<div>
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
