const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books.controller");
const authorsController = require("../controllers/authors.controller");

router.route("/")
    .get(booksController.getAll)
    .post(booksController.addOne);

router.route("/:bookId")
    .get(booksController.getOne)
    .delete(booksController.deleteOne)
    .patch(booksController.partialUpdateOne)
    .put(booksController.fullUpdateOne);


router.route("/:bookId/authors")
    .get(authorsController.getAllAuthors)
    .post(authorsController.addAuthors);


router.route("/:bookId/authors/:authorId")
    .get(authorsController.getOneAuthor)
    .delete(authorsController.deleteOneAuthor)
    .patch(authorsController.partialUpdateOneAuthor)
    .put(authorsController.fullUpdateOneAuthor);


module.exports = router;