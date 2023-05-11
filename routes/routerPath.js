const express=require("express");
const {getallfn,getspecificfn,createfn,updatefn,deletefn} = require('../controllers/taskController');
const {loginfn,registrationfn}= require('../controllers/loginController')
const bycriptfn=require('../middlewares/bycript');
const profileDetailsfn=require('../middlewares/profiledetails')
const jwtfn = require("../middlewares/jwtauthcode");
const router=express.Router()

router.post('/signup',bycriptfn,registrationfn)
router.post('/login',loginfn)
router.get('/tasks',[jwtfn],getallfn)
router.get('/tasks/:id',[jwtfn],getspecificfn)
router.post('/tasks',[jwtfn],createfn)
router.put('/tasks/:id',[jwtfn],updatefn)
router.delete('/tasks/:id',[jwtfn],deletefn)


module.exports=router;