const jwt = require("jsonwebtoken")
const User = require("../models/UserModel.js")

// Middleware to protect routes

const protect = async(req, res, next)=>{
    let token
    console.log(req.headers.authorization)
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")

    ){
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.user.id).select("-password")
            next()
        } catch (error) {
            console.log("Token verification failed",error)
            res.status(401).json({message : "Not authorized token failed"})
        }
    } else {
        res.status(401).json({message : "Not authorized no token provided"})
    }
}

module.exports = {protect}