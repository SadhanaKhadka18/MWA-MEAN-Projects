const express=require("express");
const app=express();
require("dotenv").config();
const path=require("path");
const routes=require("./API/routes")


app.use(express.static(path.join(__dirname,process.env.PUBLIC_FOLDER)));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/",routes);

app.use(function(req,res){
    res.send("<h1>Page Not Found</h1>")
})

const server=app.listen(process.env.PORT,function(){
console.log("listening at port",server.address().port)
})