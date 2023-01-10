const jwt = require("jsonwebtoken");
const Person = require("../models/userModel")

exports.protect = async(req,res,next)   =>{
 try {
    let token = req.headers['authorization']
   
    if (token.includes("Bearer")){
       token = token.split(" ")[1]
    }
    const verifyToken = jwt.verify(token,process.env.JWT_SECRET)
   
    req.personId= verifyToken.sub
    next()
 } catch (error) {
    console.log(error)
    res.status(500).json({msg:" invalid token."})
    
 }
}
exports.isAdmin =  async(req,res,next)   =>{
    try {
        const userInfo = await Person.findById(req.personId)
        if(userInfo.role!=='admin') return res.status(401).json({msg:" you are not authorized."})
        next()
        
    } catch (error) {
        res.status(500).json({msg:" invalid token."})
    }
}
