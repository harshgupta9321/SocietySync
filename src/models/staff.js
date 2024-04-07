const mongoose=require("mongoose")

const staffSchema=new mongoose.Schema({
    employee_id:{
        type:Number,
        required:true,
        unique:true
    },
    employee_name:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        
    },
    salary:{
        type:Number,
        required:true
    },
    phone  :{
        type:Number,
        required:true
    },
    address:{
        type:String,
        // required:true
    },
    adhar:{
        type:Number,
        required:true,
        minlength:12,
        maxlength:12,
        unique:true

    }
    // ,
    // tokens:[{
    //     token:{
    //         type:String,
    //         required:true
    //     }
    // }]
    
})


const Staff=new mongoose.model("staffDetail",staffSchema)

module.exports=Staff