const express= require("express");
const app=express();
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const multer = require("multer");
const path = require("path");

var cors = require('cors')
app.use(cors());

const UserRoute=require('./routes/users')
const authRoute=require('./routes/auth')
const postRoute=require('./routes/posts')

dotenv.config({path: './config.env'});
const DB= process.env.DATABASE;

mongoose.connect(DB).then(()=>{
    console.log("connection successfull")
}).catch((err)=>console.log("no connection"));

app.use("/images", express.static(path.join(__dirname, "public/images/")));


// middleware
app.use(express.json())

// app.get('/', (req,res)=>{
//     res.send("hello world from home page")
// })



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images/posts");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });

  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  });

app.use("/api/auth", authRoute);
app.use('/api/users',UserRoute)
app.use('/api/posts',postRoute)


const PORT=process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`server running at ${PORT}`)
})