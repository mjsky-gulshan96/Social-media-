import React,{useRef} from 'react'
import './register.css'
import { useHistory } from "react-router";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Register() {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory();

    const HandleClick =async(e)=>{
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
          passwordAgain.current.setCustomValidity("Passwords don't match!");
        } else {
          const user = {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value,
          };
          try {
            await axios.post("/auth/register", user);
            history.push("/login");
          } catch (err) {
            console.log(err);
          }
        }
    }


    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">META</h3>
                    <span className="loginDesc">connect with friends and world around you</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={HandleClick}>
                        <input placeholder='Username' className="loginInput"required ref={username} />
                        <input placeholder='Email' className="loginInput" required ref={email} type="email" />
                        <input placeholder='Password' className="loginInput" required ref={password} type="password" />
                        <input placeholder='Confirm Password' className="loginInput" required ref={passwordAgain} type="password"/>
                        <button className="loginButton" type='submit'>Sign up</button>
                        <span className="loginForgot">Already Register?</span>
                        <Link to="/login">
                        <button className="loginregisterButton">Log into Account</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
