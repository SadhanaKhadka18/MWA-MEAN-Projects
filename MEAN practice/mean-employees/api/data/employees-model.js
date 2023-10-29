const mongoose= require("mongoose");

const employeeSchema= mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    password: String,
    about: String,
    token: String,
    country: String,
    location: String,
    lng: Number,
    lat: Number,
    dob: String,
    gender: Number,
    userType: Number,
    userStatus: Number,
    profilePicture: Number,
    coverPicture: Number,
    enablefollowme: Boolean,
    sendmenotifications: Boolean,
    sendTextmessages: Boolean,
    enabletagging: Boolean,
    createdAt: String,
    updatedAt: String,
    livelng: Number,
    livelat: Number,
    liveLocation: String,
    creditBalance: Number,
    myCash: Number
});

mongoose.model(process.env.EMPLOYEEMODEL, employeeSchema, process.env.DB_EMPLOYEES_COLLECTION)