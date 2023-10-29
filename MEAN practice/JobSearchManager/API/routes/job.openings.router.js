const express = require('express');
const router = express.Router();

const jobOpeningController = require('../controllers/job.opening.controller')


router.route("/")
    .get(jobOpeningController.getAllJobOpenings)
    .post(jobOpeningController.addOneJobOpening);

router.route("/:jobId")
    .get(jobOpeningController.getOneJobOpening)
    .delete(jobOpeningController.deleteOneJobOpening)
    .patch(jobOpeningController.updateOneJobOpeningPartially)
    .put(jobOpeningController.updateOneJobOpeningfully);


module.exports = router;