const express = require('express');
const app = express();
require('dotenv').config();
require('./API/data/db')
const router = require('./API/routes/index')

app.set("port", process.env.PORT)

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api/", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:4200");
    res.header('Access-Control-Allow-Methods','GET,POST,DELETE,PUT,PATCH');
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
})
app.use("/api/", router);

const server = app.listen(app.get("port"), function () {
    console.log("app listening to ", server.address().port);
});
