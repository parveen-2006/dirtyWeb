const express = require("express");
const app = express();
const cors = require("cors")
let port = 3000;

var corsOptions = {
    origin : "http://localhost:5173", 
    method : "GET , POST , PUT , DELETE",
    optionsSuccessStatus: 200 //
}
app.use(cors(corsOptions));

const router =  require("./router") ;

app.use("/things" , router)

app.get( "/" , (req,res)=>{
    res.send('working backend');
})

app.listen(port , ()=>{
    console.log("running")
})