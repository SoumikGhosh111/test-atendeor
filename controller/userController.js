const mongoose = require('mongoose');
const User = require('../models/userModel')
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

async function register(req, res) {
    // const email = req.params.email; 
    // const password = req.params.password
    const {name, email, phoneNumber, password } = req.body;
    try {
        // checking for if user exsists or not
        let user = await User.findOne({email: req.body.email}); 
        if(user) { 
            res.status(400).json({messeg: "Already Exists"}); 
        }
        user = new User({name, email, phoneNumber, password});
        
        
        // encrypting the password
        const salt = await bycrypt.genSalt(10); 
        user.password = await bycrypt.hash(password, salt); 

        // saving the user Obj
        await user.save(); 

        // making the jwt token
        const payload = {user: {id: user.id}}; 
        const token = jwt.sign(payload, process.env.JWT_SECRET)

        return res.status(200).json({
            message: "This is user", 
            user: user, 
            token: token 
         }); 
    }
    catch (e) {
        res.status(500).json({ 
            message: e.message, 
        }) 
    }
}

async function login(req, res) {
    const {email, password} = req.query; 
    try{
        let user = await User.findOne( { email } ); 
        
        // if not user then return 
        if(!user) { 
            return res.status(404).json({message: "user not found"});
        }

        // validating the password 
        const isMatch = await bycrypt.compare(password, user.password); 
        if(!isMatch){ 
            return res.status(401).json({ 
                message: "Invalid Credentials"
            })
        }

        // making the jwt token
        const payload = {user: {id: user.id}}; 
        const token = jwt.sign(payload, process.env.JWT_SECRET)


        return res.status(200).json({
            message: `Welcome Back ${user.name}`, 
            user: user, 
            token: token
        })

     }catch(e) { 
        res.status(500).json({ 
            message: e.message
        })
     }
}


module.exports = { register, login }; 