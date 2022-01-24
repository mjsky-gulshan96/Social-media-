import React from 'react'
import "./closeFriend.css"

export default function CloseFriend({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <>
            <li className="sidebarFriends">
                <img src={PF+user.profilePicture} alt="" className="sidebarFriendImage" />
                <span className='sidebarFriendName'>{user.username}</span>
            </li>
        </>
    )
}
