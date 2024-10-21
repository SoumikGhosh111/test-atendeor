const asyncHandler = require("express-async-handler"); 
const Chat = require("../models/chatModel"); 
const User = require("../models/userModel"); 



const acessChat = asyncHandler(async(req, res) => { 

    // whom I want to chat
    const {userId} = req.body; 

    // if he exists or not ?? 
    if(!userId){ 
        return res.status(400).json({message: "User not found"}); 
    }

    // chat structure will be like this
    var isChat = await Chat.find({ 
        isGroupChat: false, 
        $and: [
            {users: {$elemMatch: {$eq: req.user._id}}}, 
            {users: {$elemMatch: {$eq: userId}}}, 
        ]
    }).populate("users", "-password").populate("lastMessage"); 


    isChat = await User.populate(isChat, { 
        path: 'lastMessage.sender', 
        select: "name, pic, email", 
    }); 


    // checking if chat exist or not ? 
    if(isChat.length > 0){ 
        res.send(isChat[0]); 
    }else{     //if chat not exist then create a chat and return that...
        var chatData = { 
            chatName: "sender", 
            isGroupChat: false, 
            users: [req.user._id, userId], 
        }; 
    }; 


    try{ 
        const createdChat = await Chat.create(chatData); 
        const fullChat = await Chat.findOne({_id: createdChat._id}).populate("users", -"password"); 
        res.status(200).send(fullChat); 
    }catch(e){ 
        res.status(e.status).json({ 
            message: e.message
        })
    }
}); 



module.exports = {acessChat}; 