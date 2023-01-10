const mongoose = require("mongoose")


const commentSchema = mongoose.Schema({
    
    desc:{
        type:String,
        required:true
    },
    
    commentOwner:{
        type:mongoose.Types.ObjectId,ref:"person",
       
    },
    createdAt : {
        type: Date,
        default : new Date(),
    }
 
    }
)


const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    likes:{
        type:[{type:mongoose.Types.ObjectId,ref:"person"}],
    },
    likesCount:{
        type:Number,
        default:0
    },
    
    owner:{
        type:mongoose.Types.ObjectId,
        ref:'person'
       
    },
    comments:[commentSchema],
    date : {
        type:Date,
        default: new Date(),
    },

    }
)
module.exports = mongoose.model("post",postSchema)