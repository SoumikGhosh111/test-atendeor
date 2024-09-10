require('dotenv').config(); 
const express = require("express"); 
const connectDB = require('./config/db'); 
const app = express(); 

// IMPORTING ROUTES
// users
const userRoutes = require("./routes/userRoutes"); 
const bodyParser = require('body-parser');


app.get("/", (req, res) => { 
    res.send("server is running on PORT"+ process.env.PORT); 
});


app.use(bodyParser.json()); 



// establishing connection with the data base
connectDB(); 


// defining the routes
// user routes
app.use("/api/users", userRoutes); 


app.get("/testing", (req, res)=> { 
    res.send("<h1>Hello Subhankar</h1>"); 
})
app.get("/server", (req, res)=> { 
    res.send("<h2>This is a testing server Atendeor Flutter APP with auth log-in and auth reg-in(changed the login from req-body to req-query kismat kumar</h2>"); 
})

app.listen(process.env.PORT, ()=>{
    console.log(":server is listening in port", process.env.PORT); 
})