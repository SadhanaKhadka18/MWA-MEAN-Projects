const express= require("express")
const app=express();
require("dotenv").config();
const routes=require("./API/routes");

require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/",routes);

app.use(function(req,res){
    res.send("<h1>Page Not Found</h1>");
})
const server=app.listen(process.env.PORT,function(){
    console.log("listening to port",server.address().port);

})
