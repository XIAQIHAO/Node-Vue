const mongoose = require("mongoose");
//建立表规则
let userSchema = new mongoose.Schema({
    username :{type:String,required:true},
    password :{type:String,required:true},
    age:{type:Number,default:~~(Math.random()*10+10)},
    Date:{type:String,default:new Date().toLocaleString()}
})

//导出表
module.exports = mongoose.model("person",userSchema);