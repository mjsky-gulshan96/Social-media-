const router=require("express").Router();
const bcrypt=require("bcrypt");
const User =require('../models/User');


// Register: meth 1

router.post('/register', async (req,res)=>{

    const {username,email,password,profilePicture,coverPicture}=req.body;

    if(!username|| !email || !password){
         res.status(422).json({error: "plz fill minimum details properly"})
    }

    try {
        const userExist= await User.findOne({email:email});

        if(userExist){
          return res.status(422).json({error: "already registered"})
        }
        else{
            const user=new User({username,email,password,profilePicture,coverPicture});

        // password hash here after getting value and pre save
            // pre fn call in userschema

        const newUser= await user.save();
        return res.status(200).json({message:"sucessfully registered",newUser})
        }
        
    } catch (error) {
        console.log(error);
    }
       
})

// meth 2

// router.post('/register', async(req,res)=>{
//     try {

//         const salt = await bcrypt.genSalt(10)
//         const hashpassword= await bcrypt.hash(req.body.password,salt);
//         const hashcpassword= await bcrypt.hash(req.body.cpassword,salt);

//         const newUser = new User({
//             username: req.body.username,
//             email: req.body.email,
//             password: hashpassword,
//             cpassword: hashcpassword
//         })
//         const user = await newUser.save();
//         return res.status(200).json({message:"sucessfully registered",user})

//     } catch (error) {
//         console.log(error);
//     }
// })



// Login
router.post('/login', async (req,res)=>{
    
    try {
        const {email,password}=req.body;
        
        if(!email || !password){
            return res.status(400).json({error:"plz fill the login form"})
        }

        // check if email present in database
        const userLogin= await User.findOne({email: email});
        //console.log(userLogin) // this gives all data related to that username

        if(userLogin){
            // now have to verify user password entered is matching with old or not
            const ismatch=await bcrypt.compare(password, userLogin.password)

             // generating jwt token and store cookie after match
             //token=await userLogin.generateAuthToken();
            //  console.log(token);

            // storing token in cookie as jwtoken on server for later user verification 

            // res.cookie("jwtoken", token, {
            //     expires:new Date(Date.now()+258920000000),
            //     httpOnly:true
            // });
            

            if(!ismatch){
                res.status(400).json({err:"invalid credentials"})
            }else{
                res.status(200).json({message:"sign in successfully",userLogin})
            }
        }
        else{
            res.status(400).json({err:"invalid credentials"})
        }


    } catch (error) {
        console.log(error);
    }
})

module.exports=router;