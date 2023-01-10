const Person =require('../models/userModel')
const Adminmiddleware = async (req,res,next)=>{
    try {
        const user = await Person.findById(req.personId)
        if(user.role ==='admin')
        next()
        else   res.status(401).json({msg: `not authorizied `})
    } catch (error) {
        res.status(400).json({msg: `inavlid token ${error} `})
        
    }
}
module.exports = Adminmiddleware

