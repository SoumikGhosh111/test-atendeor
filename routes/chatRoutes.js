const express = require("express"); 
router = express.Router(); 
const {acessChat} = require("../controller/chatController"); 
const {protect} = require("../middlewares/authMiddleware"); 

router.post("/access-chat", protect, acessChat); 

module.exports = router;  

