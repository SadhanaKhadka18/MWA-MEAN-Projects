const { log } = require("console");
const mongoose = require("mongoose");
const { off } = require("process");
const Book = mongoose.model(process.env.BOOK_MODEL);

const _runGeoQuery = function (req, res, offset, count) {
    const lng = parseFloat(req.query.lng, process.env.BASE_DECIMAL);
    const lat = parseFloat(req.query.lat, process.env.BASE_DECIMAL);
    const response = { status: parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL), message: [] };
    //Geo Json Point
    const point = { type: "Point", coordinates: [lng, lat] };
    console.log("point", point);
    const query = {
        "authors.location.coordinates": {
            $near: {
                $geometry: point,
                $maxDistance: parseFloat(process.env.GEO_SEARCH_MAX_DIST, process.env.BASE_DECIMAL),
                $minDistance: parseFloat(process.env.GEO_SEARCH_MAX_DIST, process.env.BASE_DECIMAL)
            }
        }
    }

    Book.find(query).skip(offset).limit(count).exec().then(function (book) {
        if (!book) {
            console.log("No Books added");
            response.status = parseInt(process.env.NOT_FOUND_STATUS_CODE, process.env.BASE_DECIMAL);
            response.message = { "message": process.env.NO_BOOKS_ADDED_MESSAGE }
        } else {
            response.status = parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL);
            response.message = { book }
        }
    }).catch(function (err) {

        console.log("Error getting all books");
        response.status = parseInt(process.env.ERROR_STATUS_CODE, process.env.BASE_DECIMAL);
        response.message = err;
    }).finally(function () {
        res.status(response.status).json(response.message);
    });
}

const getAll = function (req, res) {
    console.log("Get All books recieved");
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
    } if (req.query && req.query.lat && req.query.lng) {
        _runGeoQuery(req, res, offset, count);
        return;
    } else {
        Book.find().skip(offset).limit(count).exec().then(function (book) {

            if (!book) {
                console.log("No Books added");
                response.status = parseInt(process.env.NOT_FOUND_STATUS_CODE, process.env.BASE_DECIMAL);
                response.message = { "message": process.env.NO_BOOKS_ADDED_MESSAGE }
            } else {
                response.status = parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL);
                response.message = { book }
            }

        }).catch(function (err) {
            console.log("Error getting all books");
            response.status = parseInt(process.env.ERROR_STATUS_CODE, process.env.BASE_DECIMAL);
            response.message = err;
        }).finally(function () {
            res.status(response.status).json(response.message);
        });
    }
}

const addOne = function (req, res) {
    console.log("Add One Book request");
    console.log(req.body);

    const response = { status: parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL), message: [] };
    const newBook = {
        "title": req.body.title, "noOfPages": req.body.noOfPages, "publisherName": req.body.publisherName,
        "year": req.body.year, "authors": req.body.authors
    };
    Book.create(newBook).then(function (book) {
        console.log("response", book);
        response = { status: parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL), message: book };
    }).catch(function (err) {
        console.log("Error adding  book");
        response.status = parseInt(process.env.ERROR_STATUS_CODE, process.env.BASE_DECIMAL);
        response.message = err;
    }).finally(function () {
        res.status(response.status).json(response.message);
    });
}

const getOne = function (req, res) {
    console.log("get one book request");
    const bookId = req.params.bookId;
    const response = { status: parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL), message: [] };
    Book.findById(bookId).exec().then(function (book) {
        if (!book) {
            console.log("No book found");
            response.status = parseInt(process.env.NOT_FOUND_STATUS_CODE, process.env.BASE_DECIMAL);
            response.message = { "message": process.env.BOOK_NOT_FOUND_MESSAGE };
        } else {
            response.status = parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL);
            response.message = book;
        }
    }).catch(function (err) {
        console.log("Error finding  book");
        response.status = parseInt(process.env.ERROR_STATUS_CODE, process.env.BASE_DECIMAL);
        response.message = err;
    }).finally(function () {
        res.status(response.status).json(response.message);
    });
}

const deleteOne = function (req, res) {
    const bookId = req.params.bookId;
    const response = { status: parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL), message: [] };
    console.log("delete one book request");
    Book.findByIdAndDelete(bookId).exec().then(function (book) {
        if (!book) {
            console.log("No book found with the id");
            response.status = parseInt(process.env.NOT_FOUND_STATUS_CODE, process.env.BASE_DECIMAL);
            response.message = { "message": process.env.BOOK_NOT_FOUND_MESSAGE };
        } else {
            response.status = parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL);
            response.message = { "deleted book": book };

        }
    }).catch(function (err) {
        console.log("Error deleteing  book");
        response.status = parseInt(process.env.ERROR_STATUS_CODE, process.env.BASE_DECIMAL);
        response.message = err;
    }).finally(function (err) {
        res.status(response.status).json(response.message);
    });
}

const _updateOne = function (req, res, bookUpdateCallback) {
    console.log("update One book Controller");
    const bookId = req.params.bookId;
    const response = { status: parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL), message: [] };

    Book.findById(bookId).exec().then(function (book) {
        if (!book) {
            console.log("No book found with the id to update");
            response.status = parseInt(process.env.NOT_FOUND_STATUS_CODE, process.env.BASE_DECIMAL);
            response.message = { "message": process.env.BOOK_NOT_FOUND_MESSAGE };
        } else {
            bookUpdateCallback(req, res, book);
        }
    }).catch(function (err) {
        console.log(err);
        console.log("Error finding  book");
        response.status = parseInt(process.env.ERROR_STATUS_CODE, process.env.BASE_DECIMAL);
        response.message = err;
    }).finally(function () {
        if (response.status != process.env.SUCCESS_STATUS_CODE) {
            res.status(response.status).json(response.message);
        }
    });
}

const _partialBookUpdate = function (req, res, book) {
    if (req.body.title) {
        book.title = req.body.title;
    }
    if (req.body.noOfPages) {
        book.noOfPages = req.body.noOfPages;
    }
    if (req.body.publisherName) {
        book.publisherName = req.body.publisherName;
    }
    if (req.body.year) {
        book.year = req.body.year;
    }
    if (req.body.authors) {
        book.authors = req.body.authors;
    }
    const response = { status: parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL), message: [] };
    book.save().then(function (updatedBook) {
        if (!updatedBook) {
            console.log("No book found with the id to update");
            response.status = parseInt(process.env.NOT_FOUND_STATUS_CODE, process.env.BASE_DECIMAL);
            response.message = { "message": process.env.BOOK_NOT_FOUND_MESSAGE };
        } else {
            response.status = parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL);
            response.message = updatedBook;
        }
    }).catch(function (err) {
        console.log(err);
        console.log("Error updating  book");
        response.status = parseInt(process.env.ERROR_STATUS_CODE, process.env.BASE_DECIMAL);
        response.message = err;

    }).finally(function () {
        res.status(response.status).json(response.message);
    });
}

const _fullBookUpdate = function (req, res, book) {
    book.title = req.body.title;
    book.noOfPages = req.body.noOfPages;
    book.year = req.body.year;
    book.publisherName = req.body.publisherName;
    book.authors = req.body.authors;

    const response = { status: parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL), message: [] };

    book.save().then(function (updatedBook) {
        if (!updatedBook) {
            console.log("No book found with the id to update");
            response.status = parseInt(process.env.NOT_FOUND_STATUS_CODE, process.env.BASE_DECIMAL);
            response.message = { "message": process.env.BOOK_NOT_FOUND_MESSAGE };
        } else {
            response.status = parseInt(process.env.SUCCESS_STATUS_CODE, process.env.BASE_DECIMAL);
            response.message = updatedBook;
        }
    }).catch(function (err) {
        console.log(err);
        console.log("Error updating  book");
        response.status = parseInt(process.env.ERROR_STATUS_CODE, process.env.BASE_DECIMAL);
        response.message = err;
    }).finally(function () {
        res.status(response.status).json(response.message);
    });
}

const partialUpdateOne = function (req, res) {
    console.log(" partial update request recieved");
    _updateOne(req, res, _partialBookUpdate);
}

const fullUpdateOne = function (req, res) {
    console.log(" full update request recieved");
    _updateOne(req, res, _fullBookUpdate);
}


module.exports = { getAll, addOne, getOne, deleteOne, partialUpdateOne, fullUpdateOne }