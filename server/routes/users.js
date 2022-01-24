const router=require("express").Router();
const bcrypt=require("bcrypt");
const User = require("../models/User");

// update user
router.put('/:id', async (req,res)=>{
    if(req.body.userId===req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(12);
                req.body.password=await bcrypt.hash(req.body.password, salt);

                // if(req.body.isModified('password')){
                //     req.body.password= await bcrypt.hash(req.body.password,12);
                // }
            }
            catch(err){
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id,{$set: req.body})
             res.status(200).json("Account has been updated");
        } catch (error) {
            return res.status(500).json(err);
        }
    }
    else{
        return res.status(403).json({message:"You aren't allowed to update"})
    }
})

// delete user
router.delete('/:id', async (req,res)=>{
    if(req.body.userId===req.params.id || req.body.isAdmin){
        try {
            const user = await User.findByIdAndDelete(req.params.id)
             res.status(200).json("Account has been deleted");
        } catch (error) {
            return res.status(500).json(err);
        }
    }
    else{
        return res.status(403).json({message:"You aren't allowed to delete"})
    }
})

// get user
router.get('/', async (req,res)=>{

    const userId = req.query.userId
    const username = req.query.username

    try {
        const user = userId? await User.findById(userId)
        : await User.findOne({username:username})

        const {password,createdAt,updatedAt, ...other} = user._doc
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json(error);
    }
})

//get friends
router.get("/friends/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const friends = await Promise.all(
        user.followings.map((friendId) => {
          return User.findById(friendId);
        })
      );
      let friendList = [];
      friends.map((friend) => {
        const { _id, username, profilePicture } = friend;
        friendList.push({ _id, username, profilePicture });
      });
      res.status(200).json(friendList)
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
// follow a user
router.put('/:id/follow', async(req,res)=>{
    if(req.body.userId!==req.params.id){
        try {
            const user = await User.findById(req.params.id)
            const currentuser = await User.findById(req.body.userId)

            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push: {followers: req.body.userId}})
                await currentuser.updateOne({$push: {followings: req.params.id}})
                res.status(200).json("you started following this user")

            }
            else{
                res.status(403).json("you already following this user")
            }

        } catch (error) {
            res.status(403).json(error)
        }
    }
    else{
        res.status(403).json("you can't follow yourself")
    }
})

// unfollow a user
router.put('/:id/unfollow', async(req,res)=>{
    if(req.body.userId!==req.params.id){
        try {
            const user = await User.findById(req.params.id)
            const currentuser = await User.findById(req.body.userId)

            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull: {followers: req.body.userId}})
                await currentuser.updateOne({$pull: {followings: req.params.id}})
                res.status(200).json("you unfollowed this user")

            }
            else{
                res.status(403).json("you aren't foloowing this user")
            }

        } catch (error) {
            res.status(403).json(error)
        }
    }
    else{
        res.status(403).json("you can't Unfollow yourself")
    }
})


module.exports=router;