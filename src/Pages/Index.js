import axios from 'axios'
import React, { useState, useRef, useEffect } from 'react'
import Style from './../style/IndexStyle.css'
import Chat from '../Components/Chat'
import { useQuery, gql } from "@apollo/client"
import Room from '../Components/Room'
import Subscription from '../Components/Subscription'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import Navigationbar from '../Components/Navigationbar'
import { Cookies, useCookies } from "react-cookie";


function Index(props) {
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

  console.log("a")
  // useEffect(() => {
  //   console.log(cookies.token)
  //   // if (!cookies.token) {
  //   //   navigate('/auth')
  //   //   window.location.reload(false);
  //   // }
  // }, [])



  return (
      <div className='Index-Container'>
        {/* <Navigationbar /> */}
          {/* <button onClick={navigatetoprofile}>Profile</button> */}
          {/* <Link to="/profile">Profile</Link> */}
          {/* <div className='Index-Header'>
              <label>Room ID:</label>
              <input type="text" />
          </div> */}
          <Chat UserDatas={props.UserDatas}/>

          <Subscription />
      </div>
  )
}

export default Index