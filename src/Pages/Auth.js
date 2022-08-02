import React, { useState, useEffect } from 'react'
import Style from './../style/AuthStyle.css'
import axios from 'axios';
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import LoginComponent from '../Components/Login';
import RegisterComponent from '../Components/Register';

function Auth() {
    const navigate = useNavigate()

    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);


    useEffect(() => {
        // console.log(cookies.token)
        if (cookies.token) {
            navigate('/users')
            window.location.reload(false);
        }
    }, [])

    const [path, setPath] = useState("login")
    const redirect = (path) => {
        return 
    }

    if (path == "login") {
        return (
            <div className='Auth-Container'>
                <LoginComponent callback={(path) => setPath(path)}/>
            </div>
        )
    }
    else {
        return (
            <div className='Auth-Container'>
                <RegisterComponent callback={(path) => setPath(path)} />
            </div>
        )
    }
}

export default Auth