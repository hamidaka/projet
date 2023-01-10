const Post = require('../models/postModel')
const verifyOwner = async(req,res,next)=>{
    try {
        const post = await Post.findById(req.params.postId)
        console.log("userId",req.params.userId)
        console.log("post.owner", post.owner)
        if(String(post.owner).includes(req.params.userId) )return next()
        else{
            return res.status(401).json({msg:"you are not authorized."})
        }
        // user id - post's owner
    } catch (error) {
        res.status(500).json({msg:"something went wrong."})
    }
}
module.exports = verifyOwner