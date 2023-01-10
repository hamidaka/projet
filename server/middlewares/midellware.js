
const jwt = require('jsonwebtoken');
const middleware = async (req,res,next)=>{
    try {

        req.headers.token
        const verifyToken =jwt.verify(req.headers.token,process.env.JWT_SECRET)

        req.userId = verifyToken.id 
        console.log( req.userId)
        next()
    } catch (error) {
        res.status(400).json({msg: `inavlid token ${error} `})
        
    }
}
module.exports = middleware

