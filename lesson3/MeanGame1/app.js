const express = require("express");
const app = express();
require("dotenv").config();
require("./API/data/db")
app.set("port", process.env.PORT);
const path = require("path");
const routes = require("./API/routes")


app.use(express.json());
app.use(express.urlencoded({ urlencoded: true }));

app.use(express.static(path.join(__dirname, process.env.PUBLIC_FOLDER)));
app.use("/api", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
})

app.use("/api", routes);


app.use(function (req, res) {
    res.send(process.env.DEFAULT_ERROR_PAGE);
});


const server = app.listen(app.get("port"), function () {
    console.log("listening to port", server.address().port);
});







