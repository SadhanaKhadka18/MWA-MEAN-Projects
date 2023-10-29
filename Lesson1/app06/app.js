const { log } = require("console");
const fs=require("fs");
console.log("1:Get a file");
const buffer=fs.readFileSync("largeFile.txt");
console.log("2: Got thr file",buffer.toString().substring(0,21));
console.log("3: App continues");