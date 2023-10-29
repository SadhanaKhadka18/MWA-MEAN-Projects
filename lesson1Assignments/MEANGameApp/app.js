const express = require('express');
const app = express();
const path = require("path");
require("dotenv").config();
const server = app.listen(process.env.PORT, function (err,port) {
    console.log("listening at port", server.address().port);
});
app.use(express.static(path.join(__dirname,"/public")));

// app.get("/",function(req,res){
// res.status(200).sendFile(path.join(__dirname,"/public/MEANGames.html"));
// });