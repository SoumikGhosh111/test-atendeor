const express = require('express'); 
router = express.Router(); 
const {register, login} = require('../controller/userController'); 

router.get('/login', login); 
router.post('/register', register); 

module.exports = router; 