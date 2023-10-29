const mongoose = require("mongoose");
const callbackify = require("util").callbackify;
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
require("./books-model");

mongoose.connection.on("connected", function () {
    console.log("mongoose Connected to ", process.env.DB_URL);
})

mongoose.connection.on("disconnected", function () {
    console.log("mongoose disconnected");
})

mongoose.connection.on("error", function () {
    console.log("Mongoose Connection error");
})


const mongooseDisconnectWithCallback = callbackify(function () {
    return mongoose.disconnect();
})

process.on("SIGINT", function () {
    mongooseDisconnectWithCallback(function () {
        console.log(process.env.SIGINT_MESSAGE);
        process.exit(0);
    });
});
process.on("SIGTERM", function () {
    mongooseDisconnectWithCallback(function () {
        console.log(process.env.SIGTERM_MESSAGE);
        process.exit(0);
    });
});
process.on("SIGUSR2", function () {
    console.log("siguser2");
    mongooseDisconnectWithCallback(function () {
        console.log(process.env.SIGUSR2_MESSAGE);
        process.kill(process.pid,"SIGUSR2");
    });
});