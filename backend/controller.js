const JobPosting = require('./jobPosting');
const express = require('express');

const router = express.Router();

router.get('/getData', async (req, res) => {
	const { location, job } = req.query;
	const jobPosting = new JobPosting(job, location, req);
	const jobResults = await jobPosting.fetchAll();
	res.json({ jobPostings: jobResults });
});

module.exports = router;
