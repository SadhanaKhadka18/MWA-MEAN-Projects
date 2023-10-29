const express = require("express");
const router = express.Router();
const multiplyController = require("../controller/multiply.controller");
router.route("/multiply/:firstPart")
    .get(multiplyController.multiply);
module.exports = router;