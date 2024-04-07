const mongoose=require("mongoose")

const visitorSchema=new mongoose.Schema({
    visit_house_id:{
        type:Number,
        required:true,
       
    },
    visitor_name:{
        type:String,
        required:true
    },
    relation:{
        type:String,
        required:true,
        
    },
    check_in_time:{
        type:String,
        required:true
    },
    check_out_time:{
        type:String,
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
     

    }
    
})


const Visitor=new mongoose.model("visitorDetail",visitorSchema)

module.exports=Visitor