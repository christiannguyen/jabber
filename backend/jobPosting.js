const rp = require('request-promise');

const URLS = {
	github: 'https://jobs.github.com/positions.json',
	indeed: 'http://api.indeed.com/ads/apisearch',
};

const SOURCES = ['github', 'indeed'];

class JobPosting {
	constructor({ location, query, start }, req) {
		this.description = query;
		this.location = location;
		this.start = start;
		this.request = req;
	}

	paramsBuilder(source) {
		console.log('this', this.start);
		switch (source) {
			case 'github':
				return {
					url: URLS.github,
					qs: {
						full_time: true,
						description: this.description,
						location: this.location,
					},
				};
			case 'indeed':
				return {
					url: URLS.indeed,
					qs: {
						format: 'json',
						publisher: process.env.PUBLISHER_KEY,
						v: 2,
						q: this.description,
						l: this.location,
						userip: '1.2.3.4',
						useragent: this.request.headers['user-agent'],
						...(this.start && { start: this.start }),
					},
				};
			default:
				return {};
		}
	}

	parseGithub(resArray) {
		return resArray.map(posting => {
			const { company, url, location, created_at } = posting;

			return {
				company,
				url,
			};
		});
	}

	parseIndeed(resArray, totalResults) {
		return resArray.map(posting => {
			const { company, url, formattedLocation, date, snippet, jobtitle } = posting;

			return {
				company,
				url,
				title: jobtitle,
				description: snippet,
				date,
				location: formattedLocation,
			};
		});
	}

	async fetchAll() {
		const apiPromises = SOURCES.map(source => {
			const { url, qs } = this.paramsBuilder(source);
			console.log('qs', qs);
			return rp({
				uri: url,
				qs,
				json: true,
				headers: {
					'User-Agent': 'Request-Promise',
				},
			});
		});

		const apiResponses = await Promise.all(apiPromises);
		const githubResponse = this.parseGithub(apiResponses[0]);
		const indeedResponse = this.parseIndeed(apiResponses[1].results);

		// console.log('res is', res);
		// console.log('resppp', indeedResponse);
		return {
			jobPostings: [...indeedResponse],
			totalResults: apiResponses[1].totalResults,
		};
		// })
		// .catch(err => console.log('err is', err));

		// Promise.all([a, b, c].map(p => p.catch(e => e)))
		// 	.then(results => console.log(results)) // 1,Error: 2,3
		// 	.catch(e => console.log(e));
	}
}

module.exports = JobPosting;
