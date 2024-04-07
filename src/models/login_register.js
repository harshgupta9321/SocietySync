const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
require('dotenv').config()


const registerationSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true
    },
    gender  :{
        type:String,
        required:true
    },
    // dob:{
    //     type:Date,
    //     required:true
    // },
    password:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
    
})

registerationSchema.methods.generateAuthToken=async function(){
        try{
            const token=jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY)
            this.tokens=this.tokens.concat({token:token})
   
            await this.save()
            return token
        }catch(err){
            console.log(err)
        }
    }

registerationSchema.pre("save",async function(next){
    if(this.isModified("password")){
        console.log(this.password)
        this.password=await bcrypt.hash(this.password,10)
        console.log(this.password)
        
    }
  
    next()
  
})

const Register=new mongoose.model("Register",registerationSchema)

module.exports=Register