const express=require('express');
const User = require('../Models/User');
const router=express.Router()
const {body, validationResult}=require('express-validator')
const bcrypt=require("bcryptjs")
const jwt=require('jsonwebtoken')
const jwtSecret= "Thisisarandomtextdonottakeitforgranted"

router.post("/userhandle",
[
    body('name','Given short name').isLength({min:5}),
    body('gmail','invalid email format').isEmail(),
    body('password','weak password').isLength({min:6})

],async(req,res)=>{
    try {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(404).json({errors:errors.array()})
        }
        const salt=await bcrypt.genSalt(10);
        let secPassword=await bcrypt.hash(req.body.password,salt)
        await User.create({
            name:req.body.name,
            gmail:req.body.gmail,
            password:secPassword
        })
        res.json({success:true})
    } catch (error) {
        res.json({success:false})
        
    }
})

router.post('/userlogin',async(req,res)=>{
    let gmail=req.body.gmail
    try {
        let userdata=await User.findOne({gmail})
        if(!userdata){
            return res.status(400).json({errors:'try logging in with correct credentials'})

        }
        const pwdCompare=await bcrypt.compare(req.body.password,userdata.password)
        if(!pwdCompare){
            return res.status(400).json({errors:'try logging in with correct credentials'})
        }
        const data={
            user:{
                id:userdata.id
            }
        }
        const authToken=jwt.sign(data,jwtSecret)
        return res.json({success:true, authToken:authToken})
        
        
    } catch (error) {
        
    }

})

module.exports=router;