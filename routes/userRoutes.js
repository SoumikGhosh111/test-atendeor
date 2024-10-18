const express = require('express'); 
router = express.Router(); 
const {register, login, allUsers} = require('../controller/userController'); 

router.get('/login', login); 
router.post('/register', register); 
router.get('/searchuser', allUsers); 

module.exports = router; 