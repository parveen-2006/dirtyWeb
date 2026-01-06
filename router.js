const express = require("express");
const path = require('path');
const fs = require('fs');

const router = express.router();

const Upload = path.join(__dirname , 'Upload')
if(!fs.existsSync(Upload)) fs.mkdirSync(Upload);

const filepath = path.join(__dirname , "file.json");
if(!fs.existsSync(filepath)) fs.writeFileSync(filepath , "[]"  , "utf-8" ) 


function read(){
    try {
        return JSON.parse(fs.readFileSync(filepath))
    } catch (error) {
        return null
    }
}

function write (wdata){
    return fs.writeFileSync(filepath , JSON.stringify(wdata))
}


router.get('/' , (req,res)=>{
    res.send("coming from router");
})
router.post('/signin' , (req,res)=>{
    let {email , password } = req.body;
    let data = read();
    console.log(email , password);

    let newarr = data.filter((v)=>{
        return v.email === email &&  v.password == password;
    })
    console.log(newarr);


    if(newarr.length > 0){
        res.send({
            msg: "congrats you are logged in ",
            data: newarr[0]
        });
    }else{
        res.send({
            msg : "register First!"
        })
    };
})

router.post("/signup" , (req,res)=>{
    let data = read();
    let newarr= data.filter((v)=>{
        return v.email == req.body.email;
    })
    console.log(newarr)

    if(newarr.length > 0){
        res.send({
            msg : "User alerady exists",
        });
    }else{
        data.push(req.body)
        console.log(data);

        write(data)
        res.send({
            msg : "congrats user register successful",
            data: req.body
        })
    }
})







module.exports = router ;