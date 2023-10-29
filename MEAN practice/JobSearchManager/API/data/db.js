const mongoose = require('mongoose');
require('./job.opening.model')
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", function () {
    console.log("mongoose connected to", process.env.DB_URL);
})

mongoose.connection.on("disconnected", function () {
    console.log("mongoose disconnected");
})

mongoose.connection.on("error", function () {
    console.log("Mongoose connection error");
})

process.on("SIGINT", function () {
    mongoose.disconnect().then(function () {
        console.log(process.env.SIGINT_MESSAGE);
        process.exit(0);
    });

})
process.on("SIGTERM", function () {
    mongoose.disconnect().then(function () {
        console.log(process.env.SIGTERM_MESSAGE);
        process.exit(0);
    });

})
// process.on("SIGUSR2", function () {
//     mongoose.disconnect().then(function () {
//         console.log(process.env.SIGUSR2_MESSAGE);
//     });
// });
