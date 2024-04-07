require('dotenv').config()
const express=require("express")
const bcrypt=require("bcryptjs")
const path=require("path")
const app=express();
const port=process.env.PORT || 3000;
const Register=require("./models/login_register")
const cookieParser=require("cookie-parser")
const auth=require("./middleware/auth")
const House=require("./models/house")
const Staff=require("./models/staff")
const Visitor=require("./models/visitor")


require("./db/conn")
const hbs=require("hbs")

app.use(express.json())                         //It is for getting data from req body when we use postman for sending json format

app.use(express.urlencoded({extended:false}))   //It is for getting data from  registration FORM

const static_path=path.join(__dirname,"../public");
// console.log(static_path);
app.use(express.static(static_path))

app.use(cookieParser())

app.set("view engine","hbs")
const template_path=path.join(__dirname,"../templates/views")
app.set("views",template_path)

const partials_path=path.join(__dirname,"../templates/partials")
hbs.registerPartials(partials_path)

app.get("/",(req,res)=>{
  res.render("home")
})

app.get("/house",auth,(req,res)=>{
  res.render("house")
})


app.get("/house_details",auth,(req,res)=>{
  res.render("house_details")
})
app.post("/house_details",async(req,res)=>{
    try{
        // const id=req.params.id;
        const {house_id}=req.body
        const houseData=await House.find({house_id})
        console.log(houseData)
        // req.body.name=houseData[0].owners_name
      //  res.send(houseData[0].owners_name)
      res.render("house_details_id",{
        "house_id":houseData[0].house_id,
        "owner_name":houseData[0].owners_name,
        "area":houseData[0].area,
        "phone":houseData[0].phone,
        "adhar":houseData[0].adhar,
        "members":houseData[0].members,


      })

        // res.status(200).send(houseData)
    }catch(err){  
        res.status(500).send(err)
    }
})

app.get("/visitor_details",auth,(req,res)=>{
  res.render("visitor_details")
})
app.post("/visitor_details",async(req,res)=>{
    try{
        // const id=req.params.id;
        const {visit_house_id}=req.body
        const visitorData=await Visitor.find({visit_house_id})
        console.log(visitorData)
        // req.body.name=houseData[0].owners_name
      //  res.send(houseData[0].owners_name)
      res.render("visitor_details_id",{
        "visit_house_id":visitorData[0].visit_house_id,
        "visitor_name":visitorData[0].visitor_name,
        "relation":visitorData[0].relation,
        "phone":visitorData[0].phone,
        "adhar":visitorData[0].adhar,
        "address":visitorData[0].address,
        "check_in_time":visitorData[0].check_in_time,
        "check_out_time":visitorData[0].check_out_time,


      })

        // res.status(200).send(houseData)
    }catch(err){  
        res.status(500).send(err)
    }
})

// Assuming you have already set up your express app and required dependencies

// Define your route to handle POST requests for visitor details
app.get("/visitor_all",auth, async (req, res) => {
  try {
      // Extract the visit_house_id from the request body
      const { visit_house_id } = req.body;

      // Assuming you have already established a connection to your MongoDB and have a Visitor model
      // Fetch all visitor data from the Visitor collection that matches the visit_house_id
      const visitorDataAll = await Visitor.find();
      console.log(visitorDataAll)
      // Render the visitor_details_id view with the fetched visitor data
      res.render("visitor_details_all", { visitors: visitorDataAll });

  } catch (err) {
      // Handle errors
      res.status(500).send(err);
  }
});


app.get("/staff_details",auth,(req,res)=>{
  res.render("staff_details")
})
app.post("/staff_details",async(req,res)=>{
    try{
        // const id=req.params.id;
        const {employee_id}=req.body
        const staffData=await Staff.find({employee_id})
        console.log(staffData)
        // req.body.name=houseData[0].owners_name
      //  res.send(houseData[0].owners_name)
      res.render("staff_details_id",{
        "employee_id":staffData[0].employee_id,
        "employee_name":staffData[0].employee_name,
        "role":staffData[0].role,
        "phone":staffData[0].phone,
        "adhar":staffData[0].adhar,
        "address":staffData[0].address,
        "salary":staffData[0].salary


      })

        // res.status(200).send(houseData)
    }catch(err){  
        res.status(500).send(err)
    }
})


app.post("/house",auth,async (req,res)=>{
  

  try{
    const {adhar,alternate_no,phone,members,owners_name,area,house_id}= req.body
    const houseData=new House({
      adhar,alternate_no,phone,members,owners_name,area,house_id
    })
    const data=await houseData.save()
    res.render("back")
  }catch(e){
    res.status(500).send("error")
    console.log(e)
  }

})




app.get("/staff",auth,(req,res)=>{
  res.render("staff")
})

app.post("/staff",async (req,res)=>{
  try{
    const {   adhar,address,phone,role,employee_id,employee_name,salary}= req.body
    const staffData=new Staff({
      adhar,address,phone,role,employee_id,employee_name,salary
    })
    const data=await staffData.save()
    res.render("back")
  }catch(e){
    res.status(500).send("error")
    console.log(e)
  }



})

app.get("/visitor",auth,(req,res)=>{
  res.render("visitor")
})

app.post("/visitor",async (req,res)=>{
  

  try{
    const {   adhar,address,phone,visit_house_id,visitor_name,relation,check_in_time,check_out_time}= req.body
  const visitData=new Visitor({
    adhar,address,phone,visit_house_id,visitor_name,relation,check_in_time,check_out_time
  })
  const data=await visitData.save()
  res.render("back")
  }catch(e){
    res.status(500).send("error")
    console.log(e)
  }


})









app.get("/logout",auth,async(req,res)=>{
   try {
      console.log(req.user)
      // req.user.tokens=req.user.tokens.filter((element)=>{                          
      //   return element.token!==req.token
      // })                                                    // logout from only particular devices


       req.user.tokens=[]      // Logout from all devices


      res.clearCookie("jwt")

      console.log("Logout Successfully")
      // console.log(req.user)
      await req.user.save()
      // console.log(req.user)
      res.render("home")
   } catch (error) {
    console.log(error)
   }
})



app.get("/register",(req,res)=>{
    res.render("register")
})

app.post("/register",async (req,res)=>{
  try{
        const password=req.body.password;
        const confirmpassword=req.body.confirmpassword
        if(password===confirmpassword){
          const registerData= new Register({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            phone:req.body.phone,
            gender:req.body.gender,
            password:req.body.password
            // dob:req.body.dob,
         })

         const token= await registerData.generateAuthToken()
         console.log(token)

         res.cookie("jwt",token,{
          expires:new Date(Date.now()+999999999),
           httpOnly:true
         })    //cookie(name,value,[option])
         
         const data=await registerData.save()
         res.render("house")
        }else{
          res.send("Passwords are not matching")
        }
 
  }catch(e){
    if(e.keyPattern.email ==1){
      res.send("Email is already exist")
    }
    console.log(e)
    res.send("Please check enteries")
  }
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.post("/login",async(req,res)=>{
    try{
      const email=req.body.email;
    const password=req.body.password;
    const check=await Register.findOne({email:email});
    const isMatch=await bcrypt.compare(password,check.password);

    const token=await check.generateAuthToken()
    console.log(token)

    res.cookie("jwt",token,{
      expires:new Date(Date.now()+60000),
      httpOnly:true
     })  

    // console.log(isMatch)
    if(isMatch){
      res.render("house")
    }else{
      res.send("Login details are wrong")
    }
  }catch(err){
    res.send("Invalid credentials")
  }
})




app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})