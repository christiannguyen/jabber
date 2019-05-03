const JobPosting = require('./jobPosting');
const express = require('express');

const router = express.Router();

router.get('/getData', async (req, res) => {
	const jobPosting = new JobPosting(req.query, req);
	const { jobPostings, totalResults } = await jobPosting.fetchAll();
	res.json({ jobPostings, totalResults });
});

module.exports = router;
