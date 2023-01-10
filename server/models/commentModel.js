const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
    
    desc:{
        type:String,
        required:true
    },
    
    commentOwner:{
        type:mongoose.Types.ObjectId,
        ref:'person'
       
    },
    createdAt : {
        type: Date,
        default : new Date(),
    }
 
    }
)
module.exports = mongoose.model("comment",commentSchema)