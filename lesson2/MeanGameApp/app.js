const express = require("express");
const app = express();

require("dotenv").config();

require("./API/data/dbconnection").open();
const path = require("path")
const routes = require("./API/routes")


app.use(express.static(path.join(__dirname, process.env.PUBLIC_FOLDER)));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", routes);



app.use(function (req, res) {
    res.send(process.env.DEFAULT_ERROR_PAGE);
})


const server = app.listen(process.env.PORT, function () {
    console.log("Listening to port", server.address().port);
});