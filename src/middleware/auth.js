const jwt=require("jsonwebtoken")
const Register=require("../models/login_register")
require('dotenv').config()


const auth=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt
        const verifyUser=jwt.verify(token,process.env.SECRET_KEY)
        console.log(verifyUser)
        const user=await Register.findOne({_id:verifyUser._id})
        console.log(user)
        req.user=user
        req.token=token
        next()
    }catch(e){
        res.status(401).send("<h1>You have to login first to access this page.</h1>")
        console.log(e)
    }
}

module.exports=auth