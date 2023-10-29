const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    state: {
        type: String,
        required: true
    },
    city: String,
    Zip: Number,
    street: String
})

const jobOpeningSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        select: false
    },
    location: {
        type: locationSchema
    },
    description: String,
    experience: String,
    skills: [String],
    postDate: {
        type: Date
    }

})
mongoose.model(process.env.JOB_OPENING_MODEL, jobOpeningSchema, process.env.JOB_OPENING_COLLECTION_NAME);