const Person = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

exports.createNewUser = async(req,res)=>{
  
    try {
        const {email,username,password} = req.body
        const checkUser = await Person.findOne({$or:[{email},{username}]})
        if(checkUser?.email === email)return res.status(500).json({msg:"email already exists"})
        if(checkUser?.username === username) return res.status(500).json({msg:"username already exists"})
        const hashpassword =await bcrypt.hash(password,10)
        console.log(username)
        const newPerson = await Person.create({...req.body,password:hashpassword})
        res.json(newPerson)
    } catch (error) {
        // if(error.code === 11000 && error.keyValue.email !== undefined){
        //     return res.status(500).json({msg:"email already exists"})
        // }
        // else if(error.code === 11000 && error.keyValue.username !== undefined){
        //     return res.status(500).json({msg:"username already exists"})
        // }
        console.log(error)
        return res.status(500).json({msg:"something went wrong"})
        
    }
}
exports.loginUser = async(req,res)=>{
    try {
        const existUser = await Person.findOne({email:req.body.email})
        if(!existUser) return res.status(404).json({msg:'email does not exist'})
        const validatePw =  await bcrypt.compare(req.body.password,existUser.password)
        console.log(validatePw)
        if(!validatePw)  return res.status(400).json({msg:'worong password'})
        const token = jwt.sign({
            sub :existUser._id,
           role :existUser.role
            
        },process.env.JWT_SECRET,{expiresIn:'2d'})
        res.json({token,userData:existUser})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"something went wrong"})  
    }
}
exports.getUsers = async(req,res)=>{
    try {
        const userList =await Person.find()
        res.json(userList)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"something went wrong"})
    }
}
exports.getUserInfo = async(req,res)=>{
try {
    const userinfo = await Person.findById(req.personId)
    res.json(userinfo)
    
} catch (error) {
    console.log(error)
    res.status(500).json({msg:"something went wrong"})  
}
}