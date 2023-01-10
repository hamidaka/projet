const Post = require("../models/postModel")
const cloudinary = require('../helpers/cloudinary');
//const Comment =  require("../models/commentModel")  


//add comment
exports.addComment = async (req ,res) =>{
try {
    const { desc } = req.body
    console.log(req.personId)
    await Post.findByIdAndUpdate(req.params.postId,{$push :{ comments : {desc,commentOwner:req.personId}}})
    res.json({msg:"commet added"})
} catch (error) {
    res.status(500).json({msg:"something went wrong"})
    
}


} 

//delete comment
exports.deleteComment = async (req ,res) =>{
    try {
        const DeleteComment =await  Post.findOne({ _id:req.params.postId,}).select('comments')
        const checkComment = DeleteComment.comments.find((el)=>el._id==req.params.commentId)
        if(String(checkComment.commentOwner)!==req.personId)
        return res.status(401).json({msg:"you are not authorized"})
        await Post.findByIdAndUpdate(req.params.postId,{ $pull:{comments:{_id:req.params.commentId}}})
        res.json({msg:"commet added"})
    } catch (error) {
        res.status(500).json({msg:"something went wrong"})
        
    }
    
    
    } 
