const mongoose = require("mongoose");
 const reviewSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    review:{
        type:String,
        required:true
    },
    postDate:{
        type:Date,
        default:Date.now()
    }
 });

const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country: String,
    established: Number,
    location: String
});
const gameSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: Number,
    rate: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    price: Number,
    minPlayers: {
        type: Number,
        min: 1,
        max: 10
    },
    maxPlayers: {
        type: Number,
        min: 1,
        max: 10
    },
    minAge: Number,
    designers: [String],
    publisher:publisherSchema,
    reviews:[reviewSchema]
});
mongoose.model(process.env.GAME_MODEL, gameSchema, "games");