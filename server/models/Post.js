const mongoose=require("mongoose");
const bcrypt=require("bcrypt");


const PostSchema= mongoose.Schema({

    userId:{
        type: String,
        required:true,
        min:6
    },
    desc:{
        type: String,
        max:500
    },
    img:{
        type: String,
    },
    likes:{
        type: Array,
        default: []
    },
},
{timestamps:true}
)


module.exports = mongoose.model('Post', PostSchema)

