const { log, error } = require("console");
const mongoose = require("mongoose");
const Book = mongoose.model(process.env.BOOK_MODEL);
const callbackify = require("util").callbackify

const bookFindByIdSelectAauthorsExecWithCallback = callbackify(function (bookId) {
    return Book.findById(bookId).select("authors").exec();
})

const bookSaveWithCallback = callbackify(function (book) {
    return book.save();
})
const bookUpdateOneAuthorPushWithCallback = callbackify(function (book, newAuthors) {
    return Book.updateOne({ _id: book.id }, { $push: { authors: newAuthors } });
})
const bookUpdateOneAuthorPullWithCallback = callbackify(function (bookId, authorId) {
    return Book.updateOne({ _id: bookId }, { $pull: { authors: { _id: authorId } } });
})

const bookUpdateOneBookIdSetNewBookWithCallback = callbackify(function (bookId, authorId, modifiedAuthor) {
    console.log(modifiedAuthor);
    return Book.updateOne({ "_id": bookId, "authors._id": authorId }, {
        $set: {
            "authors.$.name": modifiedAuthor.name,
            "authors.$.description": modifiedAuthor.description
        }
    })

})


const _addAuthor = function (req, res, book) {
    const newAuthors = req.body.authors;
    bookUpdateOneAuthorPushWithCallback(book, newAuthors, function (err, addAuthorAcknowledgement) {

        const response = { status: process.env.SUCCESS_STATUS_CODE, message: [] }
        if (err) {
            response.status = process.env.ERROR_STATUS_CODE;
            response.message = err;
        } else {
            response.status = process.env.SUCCESS_STATUS_CODE;
            response.message = { "added author acknowledged": addAuthorAcknowledgement.acknowledged };
        }
        res.status(response.status).json(response.message);

    });

}


const getAllAuthors = function (req, res) {
    console.log("get authors request");
    const bookId = req.params.bookId;
    bookFindByIdSelectAauthorsExecWithCallback(bookId, function (err, book) {
        const response = { status: process.env.SUCCESS_STATUS_CODE, message: book }
        if (err) {
            response.status = process.env.ERROR_STATUS_CODE;
            response.message = { err };
        }
        if (!book) {
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = { "message":process.env.BOOK_NOT_FOUND_MESSAGE};
        } else if (!book.authors) {
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = { "message": process.env.AUTHOR_OF_BOOK_NOT_FOUND_MESSAGE };
        } else {
            response.status = process.env.SUCCESS_STATUS_CODE;
            response.message = book.authors;
        }
        res.status(response.status).json(response.message);

    })

}

const addAuthors = function (req, res) {
    console.log("add author request");
    const bookId = req.params.bookId;
    bookFindByIdSelectAauthorsExecWithCallback(bookId, function (err, book) {

        const response = { status: process.env.SUCCESS_STATUS_CODE, message: book }
        if (err) {
            response.status = process.env.ERROR_STATUS_CODE;
            response.message = { err };
        }
        if (!book) {
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = { "message": process.env.BOOK_NOT_FOUND_MESSAGE };
        } else if (book) {
            _addAuthor(req, res, book);

        } else {
            res.status(response.status).json(response.message);
        }
    });

}
const getOneAuthor = function (req, res) {
    console.log("get one author request");
    const bookId = req.params.bookId;
    const authorId = req.params.authorId;
    bookFindByIdSelectAauthorsExecWithCallback(bookId, function (err, book) {
        const response = { status: process.env.SUCCESS_STATUS_CODE, message: book }
        if (err) {
            response.status = process.env.ERROR_STATUS_CODE;
            response.message = err;
        }
        if (!book) {
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = { "message":process.env.BOOK_NOT_FOUND_MESSAGE};
        } else if (!book.authors) {
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = { "message":  process.env.AUTHOR_OF_BOOK_NOT_FOUND_MESSAGE };
        } else if (book.authors.id(authorId)) {
            response.status = process.env.SUCCESS_STATUS_CODE;
            response.message = book.authors.id(authorId);
        } else {
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = { "error message": process.env.AUTHOR_ID_BOOK_NOT_FOUND_MESSAGE };

        }

        res.status(response.status).json(response.message);

    })

}
const deleteOneAuthor = function (req, res) {
    console.log("delete one author request");
    const bookId = req.params.bookId;
    const authorId = req.params.authorId;
    bookUpdateOneAuthorPullWithCallback(bookId, authorId, function (err, deleteAcknowlegement) {
        const response = { status: process.env.SUCCESS_STATUS_CODE, message: deleteAcknowlegement.acknowledged }
        if (err) {
            response.status = process.env.ERROR_STATUS_CODE;
            response.message = err;
        }
        else {
            response.status = process.env.SUCCESS_STATUS_CODE;
            response.message = { "delete acknowledgement": deleteAcknowlegement.acknowledged };
        }

        res.status(response.status).json(response.message);

    })

}
const partialUpdateOneAuthor = function (req, res) {
    console.log("partial update one author request");
    const bookId = req.params.bookId;
    const authorId = req.params.authorId;
    let modiifiedAuthor = {};
    bookFindByIdSelectAauthorsExecWithCallback(bookId, function (err, book) {
        const response = { status: process.env.SUCCESS_STATUS_CODE, message: book }
        if (err) {
            response.status = process.env.ERROR_STATUS_CODE;
            response.message = err;
        }
        if (!book) {
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = { "message": process.env.BOOK_NOT_FOUND_MESSAGE };
        } else if (!book.authors) {
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = { "message":  process.env.AUTHOR_OF_BOOK_NOT_FOUND_MESSAGE };
        } else if (book.authors.id(authorId)) {
            modiifiedAuthor = { ...book.authors.id(authorId) }._doc;

        } else {
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = { "error message": process.env.AUTHOR_ID_BOOK_NOT_FOUND_MESSAGE };

        }
    });
    if (req.body.name && req.body.name) {
        modiifiedAuthor.name = req.body.name;
    }
    if (req.body && req.body.description) {
        modiifiedAuthor.description = req.body.description;
    }
    console.log("modifiedAuthor", modiifiedAuthor);
    bookUpdateOneBookIdSetNewBookWithCallback(bookId, authorId, modiifiedAuthor, function (err, authorAck) {
        const response = { status: process.env.SUCCESS_STATUS_CODE, message: { "updated  author for the book partially acknowledgement": authorAck.acknowledged } };
        if (err) {
            console.log("Error updating  author of book");
            response.status = process.env.ERROR_STATUS_CODE;
            response.message = err;
        }
        res.status(response.status).json(response.message);

    })


}
const fullUpdateOneAuthor = function (req, res) {
    console.log("full update one author request");
    const bookId = req.params.bookId;
    const authorId = req.params.authorId;
    let modiifiedAuthor = { name:process.env.N0_NAME, "description": null };
    if (req.body.name && req.body.name) {
        modiifiedAuthor.name = req.body.name;
    }
    if (req.body && req.body.description) {
        modiifiedAuthor.description = req.body.description;
    }
    console.log("modifiedAuthor", modiifiedAuthor);
    bookUpdateOneBookIdSetNewBookWithCallback(bookId, authorId, modiifiedAuthor, function (err, authorAck) {
        const response = { status: process.env.SUCCESS_STATUS_CODE, message: { "updated  author for the book fully acknowledgement": authorAck.acknowledged } };
        if (err) {
            console.log("Error updating  author of book");
            response.status = process.env.ERROR_STATUS_CODE;
            response.message = err;
        }
        res.status(response.status).json(response.message);

    })
}
module.exports = {
    getAllAuthors,
    addAuthors,
    getOneAuthor,
    deleteOneAuthor,
    partialUpdateOneAuthor,
    fullUpdateOneAuthor
}