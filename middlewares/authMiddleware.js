const jwt = require("jsonwebtoken"); 
const User = require("../models/userModel"); 
const asyncHandler = require("express-async-handler"); 

const protect = asyncHandler(async(req, res, next) => { 
    let token; 

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer") ){ 
        try{ 
            token = req.headers.authorization.split(" ")[1]; 

            // decode the token
            const decode = jwt.verify(token, process.env.JWT_SECRET); 

            // returning the user if any 
            req.user = await User.findById(decode.user.id).select("-password");   //face the first issue with this as the decode.id is retruning me as null or undefined it is needed to be decode.user.id (the object structure)
            next(); 
        }catch(e){ 
            res.status(401).json({ 
                message: `${e.message}, from protect `
            })
        } 
    }

    if(!token) { 
        res.status(401).json({ 
            message: "Not Authorised, no token found"
        })
    }
}) 


module.exports = {protect}; 

