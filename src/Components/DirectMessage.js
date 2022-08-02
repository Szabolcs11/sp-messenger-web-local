import { gql, useMutation, useQuery, useSubscription } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import Chat from './Chat';
import MessageComponent from './Message';
import FileUpload from './FileUpload';
import Style from './../style/DirectMessageStyle.css'
import { Cookies, useCookies } from "react-cookie";
import { v4 as uuid } from 'uuid'
import axios from 'axios';

import { AiOutlineCloseCircle } from "react-icons/ai"


const GETALLMESSAGEFROMEXPRESS = gql`
query Query($roomId: ID!) {
    messages(room_id: $roomId) {
      id
      message
      date
      roomkey
      imageurl
      sender {
        username
        id
        avatarurl
      }
    }
  }
`


const SENDMESSAGETOEXPRESS = gql`
mutation Mutation($input: MessageInput!) {
    createMessage(input: $input) {
      id
      message
      date
      sender {
        username
        id
      }
    }
  }
`

const SUBSCRIBETOMESSAGES = gql`
subscription Subscription($roomId: ID!) {
    messagesent(room_id: $roomId) {
      id
      message
      date
      roomkey
      sender {
        username
        id
      }
    }
  }
`

function DirectMessage(props) {
  // console.log(props)
    const params = useParams()
    // console.log(params.id)
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    const [Message, setMessage] = useState([{}])
    const [CurrentRoomKey, setCurrentRoomKey] = useState(params.id)
    const [Partnername, setPartnername] = useState("")
    const [ImageID, setImageID] = useState()
    const [ImageURL, setImageURL] = useState()
    const mess = useRef()
    // console.log(props)
    
    const { loading, error, data, refetch } = useQuery(GETALLMESSAGEFROMEXPRESS, {variables: {roomId: CurrentRoomKey}})
    // const { loading, error, data } = useQuery(GETALLMESSAGEFROMEXPRESS, {variables: {roomId: CurrentRoomKey}})
    const [smutateFunction, { sdata, sloading, serror }] = useMutation(SENDMESSAGETOEXPRESS)
    
    // Subscription \\
    const { data: smdata, } = useSubscription(
        SUBSCRIBETOMESSAGES, 
        {variables: {roomId: CurrentRoomKey}},
        
        {
            onSubscriptionData: (onsmdata) => {

            }
        }
    )

    useEffect(() => {
      // console.log(params.id)
      if (params.id) {
        if (params.id == "Public_1" || params.id == "Public_2") {
          setPartnername(params.id)
        }
        else {

          if (cookies.partnername) {
            setPartnername(cookies.partnername)
          }
          else {
            setPartnername("error")
          }
        }
      }
    }, [])
    
    useEffect(() => {
        refetch()
    }, [smdata])
    // End of Subscription \\

    if (data) {
        if (data != Message) {
            
            setMessage(data)
        }
    }

    useEffect(() => {
      var element = document.getElementById("Chat-Messages");
      if (element) {
          element.scrollTop = element.scrollHeight
      }
  }, [Message])



    const removeimg = (file) => {
      // console.log("Remove", file)
      const array = []
      // console.log(ImageURL)
      ImageURL.map((i) => {
        if (i==file) {

        }
        else {
          array.push(i)
        }
      })
      // console.log(array)
      setImageURL(array)
    }


    const SendMessage = async () => {
      console.log(ImageURL, mess.current.value)
      if (ImageURL != null || mess.current.value != '') {
        let length = 0
        if (ImageURL) {
          length = ImageURL.length
        }
          if (CurrentRoomKey) {
            let cbinfo = []
            for (let i=0; i<length; i++) {
                const data = new FormData()
                data.append('files', ImageURL[i])
                const cc_res = await axios({
                    method: 'POST',
                    url: 'http://localhost:1337/api/upload',
                    data
                })
                console.log(cc_res.data)
                const id = cc_res.data[0].id
                cbinfo.push(id)
            }
            smutateFunction({variables: {
                input: {
                    message: mess.current.value,
                    sender: props.UserDatas.id,
                    sendername: props.UserDatas.username,
                    roomkey: CurrentRoomKey,
                    image: cbinfo
                }
            }})
            refetch()
            mess.current.value = ""
            setImageID(undefined)
            setImageURL(undefined)
          }
      }
    }


  return (
    <div className='DirectMessage-Container'>
      <div className='Chat'>
                <div className='Chat-Container'>
                    <div className='Chat-Header'>
                        <div className='Chat-Header-Text'>
                            {Partnername}
                        </div>
                    </div>
                    <div className='Chat-Content'>
                        <div className='Chat-Conent-Main' id='Chat-Messages'>
                        
                        { Message.messages ?
                        Message.messages.map((d) => {
                            return (
                                // console.log(d)
                                <MessageComponent MyName={props.UserDatas.username} key={d.id} MessageText={d.message} Date={d.date} SenderName={d.sender.username} Imageurl={d.imageurl} Avatarurl={d.sender.avatarurl}/>
                            )
                        })
                        :
                            <p>Error loading message!</p>
                        }
                        </div>
                    </div>

                    {
                      ImageURL ?
                      ImageURL.length > 0 ?
                      <div className='Chat-Previews'>
                      <div className='Chat-Previews-Container'>
                        <div className='Chat-Previews-Main'>
                          {
                            ImageURL.map((i) => {
                              const url = URL.createObjectURL(i)
                              return (
                                <div key={i.name} className='Chat-Previews-Item'>
                                  <img className='PreviewImg' src={url}/>
                                  <span className='Preview-Close'><AiOutlineCloseCircle onClick={() => removeimg(i)}/></span>
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                    </div>
                      :
                      <></>
                      :
                      <p>Error</p>
                    }
                    

                    <div className='Chat-Control'>
                        <div className='Chat-Control-Container'>
                            <div className='Chat-Control-Container-Main'>
                                <div className='Chat-Control-Containe-Input'>
                                    <input type="text" ref={mess}/>
                                    <div className='Chat-Control-SendButton CursorPointer' onClick={SendMessage}>
                                        Send
                                    </div>
                                </div>
                                <div className='Chat-Control-Image-Upload-Container'>
                                    {/* <FileUpload callback={(id, urls) => {
                                      setImageURL(urls)
                                      setImageID(id)
                                    }}/> */}
                                    <FileUpload callback={(cburl) => {
                                      setImageURL(cburl)
                                    }}/>
                                    {/* <FileUpload callback={(id) => setImageID(id)}/> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      {/* < Chat UserDatas={props.UserDatas}/> */}
    </div>
  )
}

export default DirectMessage