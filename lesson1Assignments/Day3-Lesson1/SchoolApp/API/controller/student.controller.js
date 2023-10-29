const studentData=require("../data/school.json");
const getAllStudent=function(req,res){
    console.log("get all students reached");
    let offset=0;
    let count=2;
    if(req.query&&req.query.offset){
        offset=parseInt(req.query.offset,10)
    }
    if(req.query&&req.query.count){
        count=parseInt(req.query.count,10)
    }
    const pageStudent=studentData.slice(offset,offset+count);
    res.status(200).json(pageStudent)
    
};
const getOneStudent=function(req,res){
    const index=req.params.index;
    res.status(200).json(studentData[index])

};
module.exports={getAllStudent,getOneStudent};