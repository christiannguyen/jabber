const rp = require('request-promise');
const cheerio = require('cheerio');

const URLS = {
	github: 'https://jobs.github.com/positions.json',
	indeed: 'http://api.indeed.com/ads/apisearch',
};

const SOURCES = ['github', 'indeed'];

class JobPosting {
	constructor(description, location, req) {
		this.description = description;
		this.location = location;
		this.request = req;
	}

	mapResponseObject({ company, title, description = '', postingUrl, location }) {
		return {
			company,
			title,
			description,
			postingUrl,
			location,
		};
	}

	paramsBuilder(source) {
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

	parseIndeed(resArray) {
		return resArray.map(posting => {
			const { company, url, formattedLocation, created_at, date, snippet, jobtitle } = posting;

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
			return rp({
				uri: url,
				qs,
				json: true,
				headers: {
					'User-Agent': 'Request-Promise',
				},
			});
		});

		// var options = {
		// 	uri:
		// 		'https://www.linkedin.com/search/results/all/?keywords=recruiter%20at%20apple&origin=GLOBAL_SEARCH_HEADER',
		// 	transform: function(body) {
		// 		return cheerio.load(body);
		// 	},
		// };

		// const $ = await rp(options);
		// console.log('haha', $('.search-results-container').html());
		// $('.search-result__result-link').each(function(i, elem) {
		// 	console.log('each is', $(this).attr('href'));
		// });
		const apiResponses = await Promise.all(apiPromises);
		// .then(res => {
		const githubResponse = this.parseGithub(apiResponses[0]);
		const indeedResponse = this.parseIndeed(apiResponses[1].results);

		// console.log('res is', res);
		// console.log('resppp', indeedResponse);
		return [...indeedResponse];
		// })
		// .catch(err => console.log('err is', err));

		// Promise.all([a, b, c].map(p => p.catch(e => e)))
		// 	.then(results => console.log(results)) // 1,Error: 2,3
		// 	.catch(e => console.log(e));
	}
}

module.exports = JobPosting;
