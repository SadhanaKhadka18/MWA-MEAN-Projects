const express = require("express");
const router = express.Router();
const booksRouter = require("../routes/books.routes");
const usersRouter = require("../routes/users.routes")

router.use("/books", booksRouter);
router.use("/users", usersRouter);

module.exports = router;