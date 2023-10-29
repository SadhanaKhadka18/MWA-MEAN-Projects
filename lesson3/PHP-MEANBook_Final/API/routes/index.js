const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books.controller");
const authorsController = require("../controllers/authors.controller");

router.route("/books")
    .get(booksController.getAll)
    .post(booksController.addOne);

router.route("/books/:bookId")
    .get(booksController.getOne)
    .delete(booksController.deleteOne)
    .patch(booksController.partialUpdateOne)
    .put(booksController.fullUpdateOne);


router.route("/books/:bookId/authors")
    .get(authorsController.getAllAuthors)
    .post(authorsController.addAuthors);


router.route("/books/:bookId/authors/:authorId")
    .get(authorsController.getOneAuthor)
    .delete(authorsController.deleteOneAuthor)
    .patch(authorsController.partialUpdateOneAuthor)
    .put(authorsController.fullUpdateOneAuthor);


module.exports = router;