const fileName="index.js";
const goodbye=function(name){
console.log("Goodbye",name)}
const intro=function(){
    console.log("I'm a node file called",fileName);
} 
module.exports={greeting:goodbye,intro}