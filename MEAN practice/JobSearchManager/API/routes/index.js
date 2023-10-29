const express = require('express');
const router = express.Router();
const jobOpeningRouter = require('./job.openings.router')

router.use('/jobOpening/', jobOpeningRouter);

module.exports = router;