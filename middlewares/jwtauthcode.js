const bcrypt = require("bcryptjs");
const user=require("../models/loginModel");
const jwt=require("jsonwebtoken");
require('dotenv').config();

const JWTCODE=process.env.JWTCODE;
const jwtfn=async(req,res,next)=>{
    // console.log("req",req.headers.authtoken);
    const token= req.headers.authtoken;
    if(!token){
        return res.status(401).send({error: "please give valid auth token/token not present"})
    }
    try{
        const data=jwt.verify(token, JWTCODE);
        req.body.userId=data.username._id;
        // console.log("id",data.username)
    }catch(e){
        return res.status(401).send({error: "please give valid auth token"})

    }
    next();  //im middle ware we have to call next ,to end middleware 
}
module.exports=jwtfn;