const express = require('express'); 
router = express.Router(); 
const {register, login, allUsers} = require('../controller/userController'); 
const {protect} = require("../middlewares/authMiddleware"); 

router.get('/login', login); 
router.post('/register', register); 
router.get('/searchuser',protect, allUsers); 

module.exports = router; 