const express=require('express');
require('dotenv').config();
const app=express();
const path=require('path');

const server=app.listen(process.env.PORT,function(){
    console.log("listening  to port",server.address().port);
});
app.use(express.static(path.join(__dirname,'public')));

app.post("/",function(req,res){
    res.status(200).json({'json-body':'Sadhana'});
})
