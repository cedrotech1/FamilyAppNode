const mongoose=require("mongoose");
const memberSchema= new mongoose.Schema({
    fname:String,
    lname:String,
    gender: String,
    age:String,
    password:String,
    username:String,
    // roomid:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'room',
    // },
    
})
module.exports=mongoose.model('member',memberSchema);