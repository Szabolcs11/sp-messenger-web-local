import React, { useEffect, useState } from 'react'
import Style from './../style/NavigationStyle.css'
import { useNavigate, Navigate } from 'react-router-dom'
import { Cookies, useCookies } from "react-cookie";
import axios from 'axios';


function Navigationbar(props) {
    console.log(props)
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    const [avatarURL, setAvatarURL] = useState()
    const navigateto = (path) => {
        navigate(path)
    }

    const singout = () => {
        removeCookie("token")
        navigate('/auth')
        window.location.reload(false);
    }

    useEffect(() => {
        const fetch = async () => {
            const getmethod = await axios({
                method: 'GET',
                url: 'http://localhost:1337/api/users/' + props.user.id + '?populate=Avatar',
            })
            // console.log(getmethod.data.Avatar.url)
            let avatar = "http://localhost:1337" + getmethod.data.Avatar.url
            setAvatarURL(avatar)
        }
        fetch()
    }, [])

  return (
    <div className='Navbar'>
        <div className='Navbar-Container'>
            <div className='Navbar-Content-Container'>
                <div className='Navbar-Logo CursorPointer' onClick={() => navigateto("/users")}>
                    Logo
                </div>
                <div className='Navbar-Menus-Container'>
                    {/* <div className='Navbar-Menu-Container CursorPointer' onClick={() => navigateto("/")}>
                        Home
                    </div> */}
                    <div className='Navbar-Menu-Container CursorPointer' onClick={() => navigateto("/users")}>
                        Direct Message
                    </div>
                    <div className='Navbar-Menu-Container CursorPointer' onClick={() => navigateto("/profile")}>
                        Profile
                    </div>
                    <div className='Navbar-Menu-Container CursorPointer'>
                        <div className='Navbar-Menu-Name-Container'>
                            <img className='Navbar-Avatar' src={avatarURL} />
                            {props.user.username}
                        </div>
                    </div>
                </div>
                <div className='Navbar-Logout CursorPointer' onClick={singout}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                        <path d="M7 12h14l-3 -3m0 6l3 -3" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
    // <div className='NavigationBar'>
    //     <div className='NavigationBar-Container'>
    //         <div className='NavigationBar-Container-Title CursorPointer' onClick={() => navigateto("/")}>
    //             Messenger
    //         </div>
    //         <div className="NavigationBar-Container-Menu-Container">
    //             <div className='NavigationBar-Container-Menu' onClick={() => navigateto("profile")}>
    //                 Profile
    //             </div>
    //             <div className='NavigationBar-Container-Menu' onClick={() => navigateto("users")}>
    //                 Users
    //             </div>
    //             <div className='NavigationBar-Container-Menu' onClick={() => navigateto("users")}>
    //                 Users
    //             </div>
    //         </div>
    //     </div>
    // </div>
  )
}

export default Navigationbar