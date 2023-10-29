const { log, error } = require("console");
const mongoose = require("mongoose");
const Book = mongoose.model(process.env.BOOK_MODEL);

const _addAuthor = function (req, res, book) {
    const newAuthors = req.body.authors;
    const response = { status: parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL), message: [] }
    Book.updateOne({ _id: book.id }, { $push: { authors: newAuthors } }).then(function (addAuthorAcknowledgement) {
        console.log(addAuthorAcknowledgement);
        response.status = parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL);
        response.message = { "added author acknowledged": addAuthorAcknowledgement.acknowledged };

    }).catch(function (err) {
        response.status = parseInt(process.env.ERROR_STATUS_CODE, process.env.BASE_DECIMAL);
        response.message = err;

    }).finally(function () {
        res.status(response.status).json(response.message);
    });
}

const getAllAuthors = function (req, res) {
    console.log("get authors request");
    const bookId = req.params.bookId;
    let offset = parseInt(process.env.DEFAULT_FIND_OFFSET, process.env.BASE_DECIMAL);
    let count = parseInt(process.env.DEFAULT_FIND_COUNT, process.env.BASE_DECIMAL);
    const maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT, process.env.BASE_DECIMAL);
    const response = { status: parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL), message: [] };
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, process.env.BASE_DECIMAL);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, process.env.BASE_DECIMAL);
    }
    if (isNaN(offset) || isNaN(count)) {
        response.status = parseInt(process.env.INPUT_ERROR, process.env.BASE_DECIMAL);
        response.message = { "message": process.env.QUERY_OFFSET_TYPEE_MISMATCH_MESSGAE };
        res.status(response.status).json(response.message);
        return;
    };
    if (count > maxCount) {
        response.status = parseInt(process.env.INPUT_ERROR, process.env.BASE_DECIMAL);
        response.message = { "message": process.env.EXCEED_MAX_COUNT_MESSAGE + maxCount }
        res.status(response.status).json(response.message);
        return;
    } else {
        Book.findById(bookId).select("authors").skip(offset).limit(count).exec().then(function (book) {
            if (!book) {
                response.status = parseInt(parseInt(process.env.NOT_FOUND_STATUS_CODE, process.env.BASE_DECIMAL), process.env.BASE_DECIMAL);
                response.message = { "message": process.env.BOOK_NOT_FOUND_MESSAGE };
            } else if (!book.authors) {
                response.status = parseInt(parseInt(process.env.NOT_FOUND_STATUS_CODE, process.env.BASE_DECIMAL), process.env.BASE_DECIMAL);
                response.message = { "message": process.env.AUTHOR_OF_BOOK_NOT_FOUND_MESSAGE };
            } else {
                response.status = parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL);
                response.message = book.authors;
            }
        }).catch(function (err) {
            response.status = parseInt(process.env.ERROR_STATUS_CODE, process.env.BASE_DECIMAL);
            response.message = { err };
        }).finally(function () {
            res.status(response.status).json(response.message);
        });
    }
}

const addAuthors = function (req, res) {
    console.log("add author request");
    const bookId = req.params.bookId;
    const response = { status: parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL), message: [] }

    Book.findById(bookId).select("authors").exec().then(function (book) {
        if (!book) {
            response.status = parseInt(parseInt(process.env.NOT_FOUND_STATUS_CODE, process.env.BASE_DECIMAL), process.env.BASE_DECIMAL);
            response.message = { "message": process.env.BOOK_NOT_FOUND_MESSAGE };
        } else {
            _addAuthor(req, res, book);
        }
    }).catch(function (err) {
        response.status = parseInt(process.env.ERROR_STATUS_CODE, process.env.BASE_DECIMAL);
        response.message = { err };
    }).finally(function () {
        if (response.status != process.env.SUCCESS_STATUS_CODE) {
            res.status(response.status).json(response.message);
        }
    });
}

const getOneAuthor = function (req, res) {
    console.log("get one author request");
    const bookId = req.params.bookId;
    const authorId = req.params.authorId;
    const response = { status: parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL), message: [] }
    Book.findById(bookId).select("authors").exec().then(function (book) {
        if (!book) {
            response.status = parseInt(parseInt(process.env.NOT_FOUND_STATUS_CODE, process.env.BASE_DECIMAL), process.env.BASE_DECIMAL);
            response.message = { "message": process.env.BOOK_NOT_FOUND_MESSAGE };
        } else if (!book.authors) {
            response.status = parseInt(parseInt(process.env.NOT_FOUND_STATUS_CODE, process.env.BASE_DECIMAL), process.env.BASE_DECIMAL);
            response.message = { "message": process.env.AUTHOR_OF_BOOK_NOT_FOUND_MESSAGE };
        } else if (!book.authors.id(authorId)) {
            response.status = parseInt(parseInt(process.env.NOT_FOUND_STATUS_CODE, process.env.BASE_DECIMAL), process.env.BASE_DECIMAL);
            response.message = { "error message": process.env.AUTHOR_ID_BOOK_NOT_FOUND_MESSAGE };
        } else {
            response.status = parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL);
            response.message = book.authors.id(authorId);
        }
    }).catch(function (err) {
        response.status = parseInt(process.env.ERROR_STATUS_CODE, process.env.BASE_DECIMAL);
        response.message = err;
    }).finally(function () {
        res.status(response.status).json(response.message);
    });
}

const deleteOneAuthor = function (req, res) {
    console.log("delete one author request");
    const bookId = req.params.bookId;
    const authorId = req.params.authorId;
    const response = { status: parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL), message: [] }
    Book.updateOne({ _id: bookId }, { $pull: { authors: { _id: authorId } } }).then(function (deleteAcknowlegement) {
        response.status = parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL);
        response.message = { "delete acknowledgement": deleteAcknowlegement.acknowledged };
    }).catch(function (err) {
        if (err) {
            response.status = parseInt(process.env.ERROR_STATUS_CODE, process.env.BASE_DECIMAL);
            response.message = err;
        }
    }).finally(function () {
        res.status(response.status).json(response.message);
    })
}

const _updateOne = function (req, res, authorUpdateCallback) {
    console.log("update One author Controller")
    const bookId = req.params.bookId;
    const authorId = req.params.authorId;
    const response = { status: parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL), message: [] }

    Book.findById(bookId).select("authors").then(function (book) {
        if (!book) {
            response.status = parseInt(parseInt(process.env.NOT_FOUND_STATUS_CODE, process.env.BASE_DECIMAL), process.env.BASE_DECIMAL);
            response.message = { "message": process.env.BOOK_NOT_FOUND_MESSAGE };
        } else if (!book.authors) {
            response.status = parseInt(parseInt(process.env.NOT_FOUND_STATUS_CODE, process.env.BASE_DECIMAL), process.env.BASE_DECIMAL);
            response.message = { "message": process.env.AUTHOR_OF_BOOK_NOT_FOUND_MESSAGE };
        } else if (!book.authors.id(authorId)) {
            response.status = parseInt(parseInt(process.env.NOT_FOUND_STATUS_CODE, process.env.BASE_DECIMAL), process.env.BASE_DECIMAL);
            response.message = { "error message": process.env.AUTHOR_ID_BOOK_NOT_FOUND_MESSAGE };
        } else {
            modifiedAuthor = book.authors.id(authorId);
            authorUpdateCallback(req, res, modifiedAuthor);
        }

    }).catch(function (err) {
        response.status = parseInt(process.env.ERROR_STATUS_CODE, process.env.BASE_DECIMAL);
        response.message = err;
    }).finally(function () {
        if (response.status != parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL)) {
            res.status(response.status).json(response.message);
        }
    });
}

const _partialAuthorUpdate = function (req, res, modifiedAuthor) {
    const bookId = req.params.bookId;
    const authorId = req.params.authorId;

    if (req.body && req.body.name) {
        modifiedAuthor.name = req.body.name;
    }
    if (req.body && req.body.description) {
        modifiedAuthor.description = req.body.description;
    }
    if (req.body && req.body.location) {
        modifiedAuthor.location = req.body.location;
    }
    const response = { status: parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL), message: [] };
    Book.updateOne({ "_id": bookId, "authors._id": authorId }, {
        $set: {
            "authors.$": modifiedAuthor
        }
    }).then(function (authorAck) {
        response.status = parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL);
        response.message = { "updated author partially acknowledgement": authorAck.acknowledged };
    }).catch(function (err) {
        console.log("Error updating  author of book");
        response.status = parseInt(process.env.ERROR_STATUS_CODE, process.env.BASE_DECIMAL);
        response.message = err;
    }).finally(function () {
        res.status(response.status).json(response.message);
    });
}

const _fullAuthorUpdate = function (req, res, modifiedAuthor) {
    const bookId = req.params.bookId;
    const authorId = req.params.authorId;
    modifiedAuthor.name = req.body.name;
    modifiedAuthor.description = req.body.description;
    modifiedAuthor.location = req.body.location;

    const response = { status: parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL), message: [] };
    Book.updateOne({ "_id": bookId, "authors._id": authorId }, {
        $set: {
            "authors.$": modifiedAuthor
        }
    }).then(function (authorAck) {
        response.status = parseInt(process.env.ERROR_STATUS_CODE, process.env.BASE_DECIMAL);
        response.message = { "updated author fully acknowledgement": authorAck.acknowledged };
    }).catch(function (err) {
        console.log("Error updating  author of book");
        response.status = parseInt(process.env.ERROR_STATUS_CODE, process.env.BASE_DECIMAL);
        response.message = err;
    }).finally(function () {
        res.status(response.status).json(response.message);
    });
}

const partialUpdateOneAuthor = function (req, res) {
    console.log("partial update one author request");
    _updateOne(req, res, _partialAuthorUpdate);
}

const fullUpdateOneAuthor = function (req, res) {
    console.log("full update one author request");
    _updateOne(req, res, _fullAuthorUpdate);
}

module.exports = {
    getAllAuthors,
    addAuthors,
    getOneAuthor,
    deleteOneAuthor,
    partialUpdateOneAuthor,
    fullUpdateOneAuthor
}