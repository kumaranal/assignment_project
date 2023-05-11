const User = require("../models/loginModel")

const jwtfn = require("../middlewares/jwtauthcode");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var validator = require("email-validator");
const crypto = require("crypto")
const { TokenExpiredError } = require("jsonwebtoken");

require('dotenv').config();

const JWTCODE = process.env.JWTCODE;



const registrationfn = async (req, res) => {
    console.log("req", req.body)
    try {
        const value = validator.validate(req.body.email);
        if (!value) {
            return res.status(400).json({msg:"Fail", data: "EMAIL is INVALID" });
        }
        let userexist = await User.findOne({ email: req.body.email });
        if (userexist) {
            return res.status(400).json({msg:"Fail", data: "email already exist" });
        }
        /////// main registration fn ////////
        let userDATA = {};
        for (const [key, value] of Object.entries(req.body)) {
            if (value == null || value == "") {
                return res.status(400).json({msg:"Fail", data: `${key} value is INVALID` });
            }
            userDATA[key] = value
        }
        userDATA["userId"] = userDATA.email;

        ////////
        User.create(userDATA)
            .then(result => {
                console.log("data", result);
                {
                    let data= result.email;
                    console.log("data",data)
                    const authtoken = jwt.sign({ data }, JWTCODE);
                    return res.status(200).json({ msg: "Success", token: authtoken });
                }
            })
            .catch(err => {
                console.log(err);
                return res.status(400).json({ msg: "Fail" });

            })
        
     
        ////////
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "failes due to error occure" });
    }

}

const loginfn = async (req, res, next) => {
    try {
        let userDATA = {};
        for (const [key, value] of Object.entries(req.body)) {
            if (value == null || value == "") {
                return res.status(400).json({ msg: "Fail" ,data: `${key} value is INVALID` });
            }
            if (key == 'name' || key == 'email') {
                userDATA[key] = value;
            }
            else {
                userDATA[key] = value
            }

        }
        const username = await User.findOne({ name: userDATA.name });
        const isMatch = await bcrypt.compare(userDATA.password, username.password);
        if (isMatch) {
            const data = {
                username: {
                    _id: username._id
                }
            }
            // const authtoken = jwt.sign(data, JWTCODE, { expiresIn: "1h" }); ///expire in 1 hour
            const authtoken = jwt.sign(data, JWTCODE); ///expire in 1 hour
            res.status(200).json({ msg: "Success", token: authtoken });
        }
        else {
            res.status(400).json({msg: "Fail", data: "invalid login credentials" });

        }
    } catch (err) {
        res.status(500).json({msg: "Fail", data: "internal problem" });
        console.log(err);
    }
}



module.exports = { loginfn, registrationfn };