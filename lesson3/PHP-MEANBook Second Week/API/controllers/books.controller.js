const { log } = require("console");
const mongoose = require("mongoose");
const { off } = require("process");
const Book = mongoose.model(process.env.BOOK_MODEL);
const callbackify = require("util").callbackify;

const bookFindSkipOffsetLimitCountExecWithCallback = callbackify(function (offset, count) {
    return Book.find().skip(offset).limit(count).exec();
})
const bookCreateWithCallback = callbackify(function (newBook) {
    return Book.create(newBook);
})

// const bookFindByQuerytsetLimitCountExecWithCallback = callbackify(function (query, offset, count) {
//     return Book.find(query).skip(offset).limit(count).exec();
// })

const bookSaveWithCallback = callbackify(function (book) {
    return book.save();
})

const bookFindByIdBookIdExecWithCallback = callbackify(function (bookId) {
    return Book.findById(bookId).exec();
})
const bookFindByIdBookIdAndDeleteExecWithCallback = callbackify(function (bookId) {
    return Book.findByIdAndDelete(bookId).exec();
})


const getAll = function (req, res) {
    console.log("Get All books recieved");
    let offset = parseInt(process.env.DEFAULT_FIND_OFFSET, 10);
    let count = parseInt(process.env.DEFAULT_FIND_COUNT, 10);
    const maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT, 10);
    const response = { status: process.env.SUCCESS_STATUS_CODE, message: [] };
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if (isNaN(offset) || isNaN(count)) {
        response.status = process.env.INPUT_ERROR;
        response.message = { "message": process.env.QUERY_OFFSET_TYPEE_MISMATCH_MESSGAE };
        res.status(response.status).json(response.message);
        return;

    };
    if (count > maxCount) {
        response.status = process.env.INPUT_ERROR;
        response.message = { "message": process.env.EXCEED_MAX_COUNT_MESSAGE + maxCount }
        res.status(response.status).json(response.message);
        return;
    } else {


        bookFindSkipOffsetLimitCountExecWithCallback(offset, count, function (err, book) {

            if (err) {
                console.log("Error getting all books");
                response.status = 500;
                response.message = err;
            }
            else if (!book) {
                console.log("No Books added");
                response.status = process.env.NOT_FOUND_STATUS_CODE;
                response.message = { "message": process.env.NO_BOOKS_ADDED_MESSAGE }
            } else {
                response.status = process.env.SUCCESS_STATUS_CODE;
                response.message = { book }
            }
            res.status(response.status).json(response.message);

        });
    }

}

const addOne = function (req, res) {
    console.log("Add One Book request");
    console.log(req.body);


    const newBook = {
        "title": req.body.title, "noOfPages": req.body.noOfPages, "publisherName": req.body.publisherName,
        "year": req.body.year, "authors": req.body.authors
    };
    bookCreateWithCallback(newBook, function (err, book) {
        const response = { status: process.env.SUCCESS_STATUS_CODE, message: book };
        if (err) {
            console.log("Error adding  book");
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);


    });
}

const getOne = function (req, res) {
    const bookId = req.params.bookId;
    bookFindByIdBookIdExecWithCallback(bookId, function (err, book) {

        const response = { status: process.env.SUCCESS_STATUS_CODE, message: book };
        if (err) {
            console.log("Error finding  book");
            response.status = 500;
            response.message = err;
        } else if (!book) {
            console.log("No book found");
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = { "message": process.env.BOOK_NOT_FOUND_MESSAGE };
        }
        res.status(response.status).json(response.message);


    });

}
const deleteOne = function (req, res) {
    const bookId = req.params.bookId;
    bookFindByIdBookIdAndDeleteExecWithCallback(bookId, function (err, book) {

        const response = { status: process.env.SUCCESS_STATUS_CODE, message: { "deleted book": book } };
        if (err) {
            console.log("Error deleteing  book");
            response.status = 500;
            response.message = err;
        } else if (!book) {
            console.log("No book found with the id");
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = { "message": process.env.BOOK_NOT_FOUND_MESSAGE };
        }
        res.status(response.status).json(response.message);


    });


}

const _updateOne = function (req, res, bookUpdateCallback) {
    console.log("update One book COntroller");
    const bookId = req.params.bookId;
    bookFindByIdBookIdExecWithCallback(bookId, function (err, book) {

        const response = { status: process.env.SUCCESS_STATUS_CODE, message: book };
        if (err) {
            console.log(err);
            console.log("Error finding  book");
            response.status = 500;
            response.message = err;
        } else if (!book) {
            console.log("No book found with the id to update");
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = { "message": process.env.BOOK_NOT_FOUND_MESSAGE };
        } if (response.status != process.env.SUCCESS_STATUS_CODE) {
            res.status(response.status).json(response.message);
        }
        bookUpdateCallback(req, res, book);

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
    bookSaveWithCallback(book, function (err, updatedBook) {
        const response = { status: process.env.SUCCESS_STATUS_CODE, message: updatedBook };
        if (err) {
            console.log(err);
            console.log("Error updating  book");
            response.status = 500;
            response.message = err;
        } else if (!updatedBook) {
            console.log("No book found with the id to update");
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = { "message": process.env.BOOK_NOT_FOUND_MESSAGE };
        }
        res.status(response.status).json(response.message);

    });

}

const _fullBookUpdate = function (req, res, book) {
    book.title = req.body.title;
    book.noOfPages = req.body.noOfPages;
    book.year = req.body.year;
    book.publisherName = req.body.publisherName;
    book.authors = req.body.authors;
    bookSaveWithCallback(book, function (err, updatedBook) {

        const response = { status: process.env.SUCCESS_STATUS_CODE, message: updatedBook };
        if (err) {
            console.log(err);
            console.log("Error updating  book");
            response.status = 500;
            response.message = err;
        } else if (!updatedBook) {
            console.log("No book found with the id to update");
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = { "message": process.env.BOOK_NOT_FOUND_MESSAGE };
        }
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