const mongoose=require("mongoose")
// const bcrypt=require("bcryptjs")
// const jwt=require("jsonwebtoken")
// require('dotenv').config()


const houseSchema=new mongoose.Schema({
    house_id:{
        type:Number,
        required:true,
        unique:true
    },
    owners_name:{
        type:String,
        required:true
    },
    area:{
        type:Number,
        required:true,
        
    },
    members:{
        type:Number,
        required:true
    },
    phone  :{
        type:Number,
        required:true
    },
    alternate_no:{
        type:Number,
        // required:true
    },
    adhar:{
        type:Number,
        required:true,
        minlength:12,
        maxlength:12
    }
    // ,
    // occupation:{
    //     type:String,
    //     required:true,
    // }
    // ,
    // tokens:[{
    //     token:{
    //         type:String,
    //         required:true
    //     }
    // }]
    
})

// registerationSchema.methods.generateAuthToken=async function(){
//         try{
//             const token=jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY)
//             this.tokens=this.tokens.concat({token:token})
   
//             await this.save()
//             return token
//         }catch(err){
//             console.log(err)
//         }
//     }

// registerationSchema.pre("save",async function(next){
//     if(this.isModified("password")){
//         console.log(this.password)
//         this.password=await bcrypt.hash(this.password,10)
//         console.log(this.password)
        
//     }
  
//     next()
  
// })

const House=new mongoose.model("houseDetail",houseSchema)

module.exports=House