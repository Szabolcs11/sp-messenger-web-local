import React, { useState } from 'react'
import { useQuery, gql } from "@apollo/client"
import Style from './../style/UsersStyle.css'
import { AiOutlinePlusCircle, AiFillMessage } from "react-icons/ai"
import { v4 as uuid } from 'uuid'
import axios from 'axios'
import User from '../Components/User'
import { useNavigate, Navigate } from 'react-router-dom'

import { Cookies, useCookies } from "react-cookie";

import { toast } from 'react-toastify';

const GETUSERS = gql`
query Query($myid: ID!) {
    getusers(myid: $myid) {
      username
      id
      avatarurl
    }
  }
`

function Users(props) {
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    const strapiurl = 'http://localhost:1337'
    const [AllUser, setAllUser] = useState()
    const navigate = useNavigate()
    const { loading, error, data, refetch } = useQuery(GETUSERS, {
    // const { loading, error, data } = useQuery(GETUSERS, {
        onCompleted: (data) => {
            console.log(data.getusers)
            setAllUser(data.getusers)
        },    
        variables: {myid: props.UserDatas.id}
    })

    const handlecreateroom = async (targetname, id) => {
        let myname = props.UserDatas.username

        const var1 = await axios.get(strapiurl+`/api/rooms?populate=user1&populate=user2&filters[$or][0][user1][username][$eq]=${myname}&filters[$or][1][user2][username][$eq]=${myname}`)
        let counter = 0;
        for (let i=0; i<var1.data.data.length; i++) {
            if (targetname == var1.data.data[i].attributes.user1.data.attributes.username) {
                joinroom(var1.data.data[i].attributes.room_id, targetname)                              
                break;
            } else {
                counter++
            }
            if (targetname == var1.data.data[i].attributes.user2.data.attributes.username) {
                joinroom(var1.data.data[i].attributes.room_id, targetname)                             
                break;
            } else {
                counter++
            }
        }
        if (var1.data.data.length*2 == counter) {
            console.log("nincs kozos szoba")
            createroom(props.UserDatas.id, Number(id), targetname)
        }
        
    }

    const createroom = async (myid, partnerid, partnername) => {
        const { data } = await axios.post(strapiurl + '/api/rooms', {data:{
            "room_id": uuid(),
            "user1": myid,
            "user2": partnerid
        }})
        console.log(data.data.attributes.room_id)
        joinroom(data.data.attributes.room_id, partnername)
    }
    
    const joinroom = (room, targetname) => {
        // toast.success("Sikeresen csatlakoztal a szobaba!")
        removeCookie("partnername")
        setCookie("partnername", targetname)
        navigate('/messages/' + room)
        // navigate('/messages/' + room + "/" + targetname)
    }



    // console.log(AllUser)
    return (
        
        <div className='Users-Main'>
            <div className='Users'>

            { AllUser ?
                AllUser.map((u) => (
                    <div key={uuid()} className='Users-Container'>
                        <div className='Users-Container-User'>
                            <div className='Users-Container-User-Avatar'>
                                {
                                    u.avatarurl ?
                                    <img className='Users-Container-User-Avatar-Img' src={strapiurl+u.avatarurl}/>
                                    :
                                    <img className='Users-Container-User-Avatar-Img' src="https://i.pinimg.com/736x/8f/1b/09/8f1b09269d8df868039a5f9db169a772.jpg"/>
                                }
                            </div>
                            <div className='Users-Container-User-Datas'>
                                <p>{u.username}</p>
                                {/* <AiFillMessage className='CursorPointer' onClick={() => handlecreateroom(u.username, u.id)}/> */}
                            </div>
                            <div className='User-Container-Button' onClick={() => handlecreateroom(u.username, u.id)}>
                                Send message
                            </div>
                        </div>
                    </div>
                ))
                :
                <p>No user</p>
            }
            </div>

            <div className='dm-Groups-Container'>
                <div className='dm-Groups-Title'>
                    Public Rooms
                </div>
                <div className='dm-Groups-Container-Main'>
                    <div className='dm-Group' onClick={() => navigate("/messages/" + "Public_1")}>
                        Public_1
                    </div>
                    <div className='dm-Group' onClick={() => navigate('/messages/' + "Public_2")}>
                        Public_2
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Users