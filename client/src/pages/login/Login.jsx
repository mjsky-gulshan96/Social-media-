import React ,{useRef, useContext} from 'react'
import './login.css'
import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'
import {CircularProgress} from "@material-ui/core"
import { useHistory } from "react-router";

export default function Login() {

    const history = useHistory();
    const email = useRef()
    const password = useRef()
    const {user, isFetching, dispatch}=useContext(AuthContext)


    const HandleClick =(e)=>{
        e.preventDefault()
        loginCall({email:email.current.value,password:password.current.value},dispatch)
        history.push("/");
    }
    console.log(user);

    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">META</h3>
                    <span className="loginDesc">connect with friends and world around you</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={HandleClick}>
                        <input placeholder='Email' type="email" className="loginInput" required ref={email} />
                        <input placeholder='Password' type="password" minLength="6" className="loginInput" required ref={password} />
                        <button className="loginButton" type='submit' disabled={isFetching}>{isFetching?<CircularProgress color="white" size="20px"/>:"Log In"}</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginregisterButton">{isFetching?<CircularProgress color="primary" size="20px"/>:"Create New Account"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
