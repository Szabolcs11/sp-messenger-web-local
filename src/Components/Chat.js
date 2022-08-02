import React, { useState, useRef, useEffect } from 'react'
import Style from './../style/ChatStyle.css'
import axios from 'axios'
import MessageComponent from './Message'
import { v4 as uuid } from 'uuid'
import { useQuery, gql, useMutation, useSubscription, useApolloClient } from "@apollo/client"
import Room from './Room'
import FileUpload from './FileUpload'


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

const GETALLROOMS = gql`
query Query($userId: ID!) {
    getrooms(user_id: $userId) {
      id
    }
  }
`



function Chat(props) {

    // console.log(props)

    const [avatarURL, setAvatarURL] = useState()
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

    const client = useApolloClient();
    // console.log(client.cache)

    const [Message, setMessage] = useState([{}])
    const mess = useRef()

    const [CurrentRoomKey, setCurrentRoomKey] = useState("Public_1")
    const [ImageID, setImageID] = useState()
    


    // UI --(graphqp)--> EXPRESS -> Strapi
    const { loading, error, data, refetch } = useQuery(GETALLMESSAGEFROMEXPRESS, {variables: {roomId: CurrentRoomKey}})
    // const { loading, error, data } = useQuery(GETALLMESSAGEFROMEXPRESS, {variables: {roomId: CurrentRoomKey}})
    // const { loading, error, data, refetch } = useQuery(GETALLMESSAGEFROMEXPRESS, {variables: {roomId: props.UserDatas.id}})
    if (data) {
        if (data != Message) {
            
            setMessage(data)
            // console.log(data)
            // setCurrentRoomKey(data.messages[0].roomkey)
            // console.log(data.messages[0].roomkey)
        }
    }
    
    useEffect(() => {
        var element = document.getElementById("Chat-Messages");
        if (element) {
            element.scrollTop = element.scrollHeight
        }
    }, [Message])

    // console.log(props.UserDatas.id)
    const { rloading, rerror, data: rdata } = useQuery(GETALLROOMS, {variables: {userId: props.UserDatas.id}})
    // console.log(rdata)
    // console.log(rdata)
    // if (rdata) {
    //     console.log(rdata)
    //     // console.log(rdata.getrooms[0].id)
    // }

    // console.log(rdata.getrooms)
    // if (rdata) {
    //     console.log(rdata)
    // }

    const [smutateFunction, { sdata, sloading, serror }] = useMutation(SENDMESSAGETOEXPRESS)


    // 1. Subscription reactban nem jo \\
    // 2. Valamiert nem kapom visza a szobakat (Reactban)
    // 3. Ki kell szurni az ismetlodo szobakat \\
    // 4. refetch() vagy setMessage(previousState...) ?

    // console.log(client.cache)

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
        refetch()
        // console.log(Message)
        // if (smdata) {
        //     // const messages = [
        //     //     ...Message,
        //     //     smdata
        //     // ]
        //     console.log(smdata)
        // }

        // setMessage(messages)
        // console.log(messages)
    }, [smdata])
    // console.log(smdata, " SUB ", CurrentRoomKey)


    // const SendMessage = () => {
    //     if (CurrentRoomKey) {
    //         smutateFunction({variables: {
    //             input: {
    //                 message: mess.current.value,
    //                 sender: props.UserDatas.id,
    //                 sendername: props.UserDatas.username,
    //                 roomkey: CurrentRoomKey
    //             }
    //         }})
    //         refetch()
    //         mess.current.value = ""
    //     }
    //     else {
    //         console.log("no room key")
    //     }
    // }


    const SendMessage = () => {
        console.log(ImageID)
        if (mess.current.value != "" || ImageID != null) {
            if (CurrentRoomKey) {
                smutateFunction({variables: {
                    input: {
                        message: mess.current.value,
                        sender: props.UserDatas.id,
                        sendername: props.UserDatas.username,
                        roomkey: CurrentRoomKey,
                        image: ImageID
                    }
                }})
                refetch()
                mess.current.value = ""
                setImageID(undefined)
            }
            else {
                console.log("no room key")
            }
        }
    }

    // const joinroom = () => {
    //     console.log("asd")
    // }

    function joinroom(roomkey) {
        console.log(roomkey)
        setCurrentRoomKey(roomkey)
        // const { loading, error, data, refetch } = useQuery(GETALLMESSAGEFROMEXPRESS, {variables: {userId: props.UserDatas.id}})
    }

    const [ImageUrls, setImageUrls] = useState(["/uploads/10x_featured_social_media_image_size_01ec4b1110.png", "/uploads/Landscape_Color_995fd81c7f.jpeg"])
    // console.log(ImageUrls)
    // console.log(ImageUrls[0])
    // console.log(ImageUrls[1])
    // let imgurls = [
    //     [0] = "/uploads/10x_featured_social_media_image_size_01ec4b1110.png",
    //     [1] = "/uploads/Landscape_Color_995fd81c7f.jpeg"
    // ]
            
    return (
        <>
            <div className='Chat'>
                <div className='Chat-Container'>
                    <div className='Chat-Header'>
                        <div className='Chat-Header-Text'>
                            {CurrentRoomKey}
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
                                    <FileUpload callback={(id) => setImageID(id)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* </div> */}
        </>
    )
}

export default Chat