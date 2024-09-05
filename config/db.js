const mongoose  = require('mongoose'); 
require('dotenv').config(); 

async function connectDb( ){ 
    try{ 
        await mongoose.connect(process.env.MONGO_URI); 
        console.log("Connected to db"); 
    }catch(e){ 
        console.log("error connecting to db"); 
        process.exit(1); 
    }; 


}

module.exports = connectDb; 