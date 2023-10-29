const express = require("express");
const router = express.Router();
const studentController = require("../controller/student.controller")

router.route("/students")
    .get(studentController.getAllStudent);
router.route("/students/:index")
    .get(studentController.getOneStudent);

module.exports = router;