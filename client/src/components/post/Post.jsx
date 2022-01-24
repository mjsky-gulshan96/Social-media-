import React, { useState , useEffect, useContext} from 'react'
import "./post.css"
import { MoreVert } from '@material-ui/icons'
import axios from 'axios'
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'
// import {Users} from '../../dummyData'


export default function Post({post}) {

  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

    return (
        <div className='post'>
           <div className="postWrapper">
               <div className="postTop">
                   <div className="postTopLeft">
                       <Link to={`profile/${user.username}`}>
                        <img src={user.profilePicture? PF + user.profilePicture: PF+ "profilePictures/nopic.png"} alt={user.username} className="postProfileImg" />
                        </Link>
                        <span className="postUserName">{user.username}</span>
                        <span className="postdate">{format(post.createdAt)}</span>
                   </div>
                   <div className="postTopRight">
                        <MoreVert/>
                   </div>
               </div>
               <div className="postCentre">
                   <span className="postText">{post?.desc}</span>
                   <img src={PF+"posts/"+post.img} alt="" className='postCentreImg'/>
               </div>
               <div className="postBottom">
                   <div className="postBottomLeft">
                       <img src={`${PF}heart.png`} alt="" className='likeIcon' onClick={likeHandler} />
                       <img src={`${PF}like.jpg`} alt=""  className='likeIcon' onClick={likeHandler}/>
                       <span className="postLikeCounter">{like} liked it</span>
                   </div>
                   <div className="postBottomRight">
                       <span className="postCommentText">{post.comment} Comments</span>
                   </div>
               </div>
           </div>
        </div>
    )
}
