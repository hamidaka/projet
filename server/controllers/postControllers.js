const Post = require("../models/postModel")
const cloudinary = require('../helpers/cloudinary');
//add Post
exports.createPost = async(req,res)=>{ 
    try {
        // const newBody = JSON.parse(req.body.info)
        // console.log(newBody)
        // const imageInfo = await cloudinary.uploader.upload(req.file.path);
       const userId = req.personId
  
       const {title,desc,img}= req.body
        const newPost = await Post.create({
            title,desc,img,
            // image: { imageURL: imageInfo.url, public_id: imageInfo.public_id },
            owner:userId})
        console.log(req.body)
        res.json(newPost)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"something went wrong"})
    }
}
exports.getPosts = async(req,res)=>{
    try {
        const posts = await Post.find({}).populate("owner").populate("likes").populate("comments.commentOwner")
        res.json(posts)
    } catch (error) {
        res.status(500).json({msg:"something went wrong"})
    }
}
exports.getPostByUserId = async(req,res)=>{
    try {
        const postList =await Post.find({owner:req.params.userId})
        res.json(postList)
    } catch (error) {
        res.status(500).json({msg:"something went wrong"})
    }
}
exports.getPostById = async(req,res)=>{
    try {
        const postList = await Post.findById(req.params.postId)
        res.json(postList)
    } catch (error) {
        res.status(500).json({msg:"something went wrong"})
    }
}
// exports.updatePost = async(req,res)=>{
//     try {
//         const updatedPost = await Post.findByIdAndUpdate(req.params.postId,req.body,{new:true})
//         res.json(updatedPost)
//     } catch (error) {
//         res.status(500).json({msg:"something went wrong"})
//     }
// }
exports.likePost = async(req,res)=>{
    try {
        const posts = await Post.findById(req.params.postId)
        const findUserId = await posts.likes.find(el=>String(el).includes(req.params.userId))
        let updatePost
        if(findUserId){
            updatePost =await Post.findByIdAndUpdate(req.params.postId,{$pull:{likes:req.params.userId}
                ,$inc:{likesCount:-1}},{new:true}).populate("likes")
        }
        else{
            updatePost =await Post.findByIdAndUpdate(req.params.postId,{$push:{likes:req.params.userId}
                ,$inc:{likesCount: 1}},{new:true}).populate("likes")
        }
        res.json(updatePost)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"something went wrong"})
    }
}
//like post
exports.likePosts = async(req,res)=>{
    try {
        const postId = req.params.postId
        const posts = await Post.findById(postId)
        console.log(req.params.postId,req.personId)
        const chekLike = await posts.likes.find((el) => el == req.personId)
       
        if(chekLike) await  Post.findByIdAndUpdate(postId,{  $pull :{ likes :req.personId}});
        else  await Post.findByIdAndUpdate(postId,{  $push :{ likes :req.personId}})
        res.json({msg:"post is liked"})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"something went wrong"})
    }
}


exports.deletePost = async(req,res)=>{
    try {
        
        const post = await Post.findById(req.params.postId)
        
        console.log(String(post.owner._id))
        console.log(req.personId)
       if(String(post.owner._id) !== req.personId) return   res.status(401).json({msg:"not authorizied"})
       await Post.findByIdAndDelete(req.params.postId)
        res.json({msg:"post deleted with success"})
    } catch (error) {
        res.status(500).json({msg:"something went wrong"})
    }
}
exports.updatePost = async(req,res)=>{
    try {
        
        const post = await Post.findById(req.params.postId)
        
        console.log(String(post.owner._id))
        console.log(req.personId)
       if(String(post.owner._id) !== req.personId) return   res.status(401).json({msg:"not authorizied"})
       await Post.findByIdAndUpdate(req.params.postId,{...req.body})
        res.json({msg:"post updated with success"})
    } catch (error) {
        res.status(500).json({msg:"something went wrong"})
    }
}