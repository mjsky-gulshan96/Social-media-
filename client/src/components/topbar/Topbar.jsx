import React, { useContext } from 'react'
import "./topbar.css"
import {Search, Person, Chat, Notifications} from "@material-ui/icons"
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export default function Topbar() {

  const {user}= useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;


    return (
        <>
          <div className="topbarContainer">
              <div className="topbarLeft">
                <Link to='/' style={{textDecoration:"none"}} >
                  <span className="logo">META</span>
                </Link>
              </div>
              <div className="topbarCentre">
                  <div className="searchbar">
                    <Search className='searchIcon'/>
                    <input placeholder='search for friends, posts or videos' className='searchInput' type="text" />
                  </div>
              </div>
              <div className="topbarRight">
                  <div className="topbarLinks">
                      <span className="topbarLink">HomePage</span>
                      <Link to="/login"  style={{textDecoration:"none" ,color:"wheat"}}>
                      <span className="topbarLink" >LogOut</span>
                      </Link>
                  </div>
                  <div className="topbarIcons">
                      <div className="topbarIconItem">
                        <Person/>
                        <span className="topbarIconBadge">1</span>
                      </div>
                      <div className="topbarIconItem">
                        <Chat/>
                        <span className="topbarIconBadge">2</span>
                      </div>
                      <div className="topbarIconItem">
                        <Notifications/>
                        <span className="topbarIconBadge">1</span>
                      </div>
                  </div>
                  <Link to={`/profile/${user.username}`}>
                  <img src={user.profilePicture? PF +"profilePictures/"+ user.profilePicture : PF + "profilePictures/nopic.png"} className="topbarImg" alt='Img' />
                  </Link>
              </div>
          </div>

        </>
    )
}
