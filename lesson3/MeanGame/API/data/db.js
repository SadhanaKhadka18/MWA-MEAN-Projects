const mongoose = require("mongoose");
require("../data/games-model")
const callbackify = require("util").callbackify;

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", function () {
    console.log("mongoose Connected to", process.env.DB_NAME);
})

mongoose.connection.on("disconnected", function () {
    console.log("mongoose disConnected ");
})

mongoose.connection.on("error", function () {
    console.log("mongoose Connection error");
})
const mongooseDisconnectWithCallback = callbackify(function () {
    return mongoose.disconnect();
});

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