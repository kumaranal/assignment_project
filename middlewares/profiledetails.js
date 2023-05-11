const jwt=require("jsonwebtoken");
const User = require("../models/loginModel")
require('dotenv').config();
const JWTCODE=process.env.JWTCODE;




const profileDetailsfn= (req,res,next)=>{

    try{
        const id=req.body.userId;         
        if(id){
            User.findById(id)
            .then(data => {
                // console.log("data",data);
                if(data.roleId==1){
                    req.body.roleId=1;
                }else{
                    req.body.roleId=2;

                }
                // console.log("req profile",req.body);
                next();
            })
            .catch(err => {
                console.log(err);
                return res.status(400).json({ msg: "Fail",error:"user not present" });
    
            })
        }        

    }catch(err){
        console.log(err);
        res.status(200).json({msg:"Fail" ,data:"invaild user"});

    }
 }
 module.exports=profileDetailsfn;