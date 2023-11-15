const mongoose=require("mongoose");
const familySchema= new mongoose.Schema({
    name:String,
    bio:String,
    batch:String,
    admin:String,
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'member',
    }]
   
    // roomid:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'room',
    // },
    
})
module.exports=mongoose.model('family',familySchema);