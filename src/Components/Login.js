import React, { useState } from 'react'
import Style from './../style/LogintStyle.css'
import LineSVG from './../style/Assets/LineSVG.svg'
import { Cookies, useCookies } from "react-cookie";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

function Login({ callback }) {

    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

    const navigate = useNavigate()
    const [Username, setUsername] = useState();
    const [Password, setPassword] = useState();
    const redirectto = (path) => {
        callback(path)
    }

    const Login = () => {
        console.log("a")
        axios.post('http://localhost:1337/api/auth/local', {
            identifier: Username,
            password: Password,
        }).then(res=> {
            setCookie("token", res.data.jwt);
            navigate('/users')
            window.location.reload(false);
            toast.success("Succesful login")
        }).catch(({response}) => {
            toast.error(response.data.error.message)
        })
    }
  return (
    <div className='Login-Container'>
        <div className='Login-Container-Content'>
            <div className='Login-Container-Title-Container'>
                <div className='Login-Container-Title-Text'>
                    Login
                </div>
            </div>
            <div className='Login-Container-Main'>
                <div className='Login-Container-Inputs'>
                    <div className='Login-Container-Input-Container'>
                        <div className='Login-Container-Input-Text'>
                            Username
                        </div>
                        <div className='Login-Container-Input'>
                            <input className='Login-Container-InputType' type="text" onChange={e => {
                                setUsername(e.target.value)
                            }}/>
                        </div>
                    </div>
                    <div className='Login-Container-Input-Container'>
                        <div className='Login-Container-Input-Text'>
                            Password
                        </div>
                        <div className='Login-Container-Input'>
                            <input className='Login-Container-InputType' type="password" onChange={e => {
                                setPassword(e.target.value)
                            }}/>
                        </div>
                    </div>
                </div>
                <div className='Login-Container-Button-Container'>
                    <div className='Login-Container-Button' onClick={Login}>
                        Login
                    </div>
                </div>
                <div className='Login-Container-Line'>
                    <svg width="400" height="30" viewBox="0 0 400 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line y1="14" x2="185" y2="14" stroke="#D9D9D9" strokeWidth="2"/>
                        <line x1="215" y1="14" x2="400" y2="14" stroke="#D9D9D9" strokeWidth="2"/>
                        <rect x="185.5" y="0.5" width="29" height="29" rx="4.5" stroke="#D9D9D9"/>
                        <path d="M200.015 14.5455C200.015 15.696 199.808 16.6903 199.392 17.5284C198.977 18.3665 198.407 19.0128 197.682 19.4673C196.958 19.9219 196.13 20.1491 195.2 20.1491C194.27 20.1491 193.442 19.9219 192.718 19.4673C191.993 19.0128 191.423 18.3665 191.008 17.5284C190.592 16.6903 190.385 15.696 190.385 14.5455C190.385 13.3949 190.592 12.4006 191.008 11.5625C191.423 10.7244 191.993 10.0781 192.718 9.62358C193.442 9.16903 194.27 8.94176 195.2 8.94176C196.13 8.94176 196.958 9.16903 197.682 9.62358C198.407 10.0781 198.977 10.7244 199.392 11.5625C199.808 12.4006 200.015 13.3949 200.015 14.5455ZM198.737 14.5455C198.737 13.6009 198.579 12.8036 198.263 12.1538C197.95 11.5039 197.526 11.0121 196.99 10.6783C196.457 10.3445 195.86 10.1776 195.2 10.1776C194.539 10.1776 193.941 10.3445 193.405 10.6783C192.872 11.0121 192.448 11.5039 192.132 12.1538C191.819 12.8036 191.663 13.6009 191.663 14.5455C191.663 15.4901 191.819 16.2873 192.132 16.9371C192.448 17.587 192.872 18.0788 193.405 18.4126C193.941 18.7464 194.539 18.9134 195.2 18.9134C195.86 18.9134 196.457 18.7464 196.99 18.4126C197.526 18.0788 197.95 17.587 198.263 16.9371C198.579 16.2873 198.737 15.4901 198.737 14.5455ZM202.237 20V9.09091H205.923C206.775 9.09091 207.474 9.23651 208.021 9.5277C208.568 9.81534 208.973 10.2113 209.236 10.7156C209.499 11.2198 209.63 11.7933 209.63 12.4361C209.63 13.0788 209.499 13.6488 209.236 14.146C208.973 14.6431 208.57 15.0337 208.027 15.3178C207.483 15.5984 206.789 15.7386 205.944 15.7386H202.961V14.5455H205.901C206.484 14.5455 206.952 14.4602 207.308 14.2898C207.666 14.1193 207.925 13.8778 208.085 13.5653C208.249 13.2493 208.33 12.8729 208.33 12.4361C208.33 11.9993 208.249 11.6175 208.085 11.2908C207.922 10.9641 207.661 10.712 207.302 10.5344C206.944 10.3533 206.47 10.2628 205.88 10.2628H203.558V20H202.237ZM207.371 15.0994L210.056 20H208.522L205.88 15.0994H207.371Z" fill="#D9D9D9"/>
                    </svg>
                </div>

                {/* <div className='Login-Container-Bottom'>
                    <div className='Login-Container-Bottom-Text'>
                        Need an account?
                    </div>
                    <div onClick={() => redirectto("register")} className='Login-Container-Login-Text'>
                        SING UP
                    </div>
                </div> */}
            </div>
            <div className='Login-Container-Bottom'>
                    <div className='Login-Container-Bottom-Text'>
                        Need an account?
                    </div>
                    <div onClick={() => redirectto("register")} className='Login-Container-Login-Text'>
                        SING UP
                    </div>
                </div> 
        </div>
    </div>
  )
}

export default Login