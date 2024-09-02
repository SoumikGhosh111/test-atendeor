require('dotenv').config(); 
const express = require("express"); 
const app = express(); 

app.get("/", (req, res) => { 
    res.send("server is running on PORT"+ process.env.PORT); 
}); 


app.get("/testing", (req, res)=> { 
    res.send("<h1>Hello Subhankar</h1>"); 
})
app.get("/server", (req, res)=> { 
    res.send("<h2>This is a testing server Atendeor Flutter APP</h2>"); 
})

app.listen(process.env.PORT, ()=>{
    console.log(":server is listening in port", process.env.PORT); 
})