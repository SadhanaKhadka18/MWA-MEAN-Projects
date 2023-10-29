const express = require("express");
const app = express();
require("dotenv").config();
const routes=require("./API/router")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api",routes);

app.use(function (req, res) {
    res.send("<h1>Page Not Found</h1>")
})




const server = app.listen(process.env.PORT, function () {
    console.log("listening to port", server.address().port);
})