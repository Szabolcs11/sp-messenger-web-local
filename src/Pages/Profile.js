import React, { useEffect, useState } from 'react'
import Style from './../style/ProfileStyle.css'
import axios from 'axios'
import { Cookies, useCookies } from "react-cookie";
import Navigationbar from '../Components/Navigationbar';
import { Logout } from 'tabler-icons-react';
import { useNavigate, Navigate } from 'react-router-dom'


function Profile(props) {

    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    const [avatarURL, setAvatarURL] = useState()
    const navigate = useNavigate()
    // console.log(cookies.token)
    // console.log(props)

    const handleChange = async (e) => {
        const data = new FormData()
        data.append('files', e.target.files[0])
        const cc_res = await axios({
            method: 'POST',
            url: 'http://localhost:1337/api/upload',
            data
        })

        console.log(cc_res.data[0].id)
        let dt = cc_res.data[0].id
        const update = await axios({
            method: 'PUT',
            url: 'http://localhost:1337/api/users/'+ props.UserDatas.id + "?populate=Avatar",
            data: {
                "Avatar": dt
            }
        })
        // console.log(update)
        window.location.reload(false);
    }

    useEffect(() => {
        const fetch = async () => {
            const getmethod = await axios({
                method: 'GET',
                url: 'http://localhost:1337/api/users/' + props.UserDatas.id + '?populate=Avatar',
            })
            // console.log(getmethod.data.Avatar.url)
            let avatar = "http://localhost:1337" + getmethod.data.Avatar.url
            setAvatarURL(avatar)
        }
        fetch()
    }, [])

    const singout = () => {
        removeCookie("token")
        navigate('/auth')
        window.location.reload(false);
    }


    return (
        <div className='Profile-Main'>
        <div className='Profile-Container'>
            <div className='Profile-Container-Content'>
                <div className='Profile-Picture-Container'>
                    <label htmlFor="file-input">
                        <img className='Avatar' src={avatarURL}/>
                    </label>
                </div>

                <div className='Profile-Container-Datas'>
                    {props.UserDatas.email}
                </div>
            </div>
            <div className='Profile-Name'>
                {props.UserDatas.username}
            </div>
            <input onChange={handleChange} id="file-input" type="file" />
        </div>
    </div>
        // <div className='Profile-Container'>
        //     <div className='AccountAvatar-Container'>
        //         <label htmlFor="file-input">
        //             <img className='Avatar' src={avatarURL}/>
        //         </label>
        //     </div>
        //     <div className='AccountDetails'>
        //         <p className='AccountDetails-Text'>{props.UserDatas.username}</p>
        //         <p className='AccountDetails-Text'>{props.UserDatas.email}</p>
        //     </div>
        //     <div className='AccountDetailts-Input'>
        //         <input onChange={handleChange} id="file-input" type="file" />
        //     </div>
        //     {/* <Logout onClick={() => singout()} className='CursorPointer'/> */}
        // </div>
    )
}

export default Profile
