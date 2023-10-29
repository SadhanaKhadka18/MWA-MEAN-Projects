const mongoose = require("mongoose");
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String
});
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    noOfPages: Number,
    year: Number,
    publisherName: String,
    authors: {
        type:[authorSchema],
        required:true}

})

mongoose.model(process.env.BOOK_MODEL, bookSchema, process.env.BOOK_COLLECTION_NAME);