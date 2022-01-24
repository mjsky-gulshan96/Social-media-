const router=require("express").Router();
const Post=require("../models/Post");
const User = require("../models/User");

// create a post
router.post('/', async(req,res)=>{
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save()
        res.status(200).json({message:"you shared this post",savedPost})
    } catch (error) {
        res.status(500).json(error)
    }
})

// update a post
router.put('/:id', async(req,res)=>{
    try {
        const post= await Post.findById(req.params.id);

        if(post.userId===req.body.userId){
            await post.updateOne({$set: req.body})
            res.status(200).json("post has been updated")
        }
        else{
            res.status(403).json("you are not allowed to update")
        }

    } catch (error) {
        res.status(500).json(error)
    }

})

// delete a post
router.delete('/:id', async(req,res)=>{
    try {
        const post= await Post.findById(req.params.id);

        if(post.userId===req.body.userId){
            await post.delete()
            res.status(200).json("post has been deleted")
        }
        else{
            res.status(403).json("you are not allowed to delete")
        }

    } catch (error) {
        res.status(500).json(error)
    }

})

// like/dislike a post
router.put('/:id/like', async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)

        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}})
            res.status(200).json("you liked this post")
            
        }
        else{
            await post.updateOne({$pull:{likes:req.body.userId}})
            res.status(200).json("you disliked this post")
            
        }
    }catch (error) {
        res.status(500).json(error)
    }
})

// get a post
router.get('/:id', async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

// get timeline post
router.get("/timeline/:userId", async(req,res)=>{

    try {
        const currentUser= await User.findById(req.params.userId)
        const userPost = await Post.find({userId:currentUser._id})

        const friendPost = await Promise.all(
            currentUser.followings.map((friendId)=>{
               return Post.find({userId:friendId})
            })
        )
        res.status(200).json(userPost.concat(...friendPost))
    } catch (error) {
        res.status(500).json(error)
    }
})

// get user's all post
router.get("/profile/:username", async(req,res)=>{

    try {
        const user= await User.findOne({username:req.params.username})
        const posts = await Post.find({userId:user._id})

        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports=router