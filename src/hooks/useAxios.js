import React, { useState, useEffect, useRef } from 'react';
import { isEqual } from 'lodash';

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

function useAxios(url, type, data) {
	const [apiData, setApiData] = useState(data);
	const [response, setResponse] = useState({
		data: null,
		loading: false,
		completed: false,
		error: false,
	});

	console.log('calls this');
	useEffect(() => {
		setResponse({
			data: null,
			loading: true,
			completed: false,
			error: false,
		});
		fetch(url, { body: data })
			.then(response => response.json())
			.then(res =>
				setResponse({
					data: res.data,
					loading: false,
					error: false,
					complete: true,
				})
			)
			.catch(() =>
				setResponse({
					data: null,
					loading: false,
					error: true,
					complete: true,
				})
			);
	}, [data, type, url]);

	return response;
}

export default useAxios;
