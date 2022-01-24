const mongoose=require("mongoose");
const bcrypt=require("bcrypt");


const UserSchema= mongoose.Schema({

    username:{
        type: String,
        required:true,
        min:6
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true,
        min:8
    },
    profilePicture:{
        type:String,
        default: ""
    },
    coverPicture:{
        type:String,
        default: ""
    },
    followers:{
        type: Array,
        default:[]
    },
    followings:{
        type: Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    desc:{
        type: String,
        max:100
    },
    city:{
        type: String,
        max:50
    },
    from:{
        type: String,
        max:50
    },
    relationship:{
        type: String,
        max:10
    },
},
{timestamps:true}
)

// hashing the pass word here

UserSchema.pre('save', async function(next){
    
    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password,12);
    }
    next()
})

module.exports = mongoose.model('User', UserSchema)

