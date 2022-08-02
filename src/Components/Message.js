import React from 'react'
import Style from './../style/MessageStyle.css'

function Message(props) {
  // console.log(props)
  const strapirul = "http://localhost:1337"
  var date = new Date(props.Date)
  let normaldate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
  let datetime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
  let sendername = props.SenderName || "error"
  // console.log(props.Avatarurl)
  // let senderavatar = "https://i.pinimg.com/736x/8f/1b/09/8f1b09269d8df868039a5f9db169a772.jpg"
  // if (props.Avatarurl) {
    let senderavatar = "http://localhost:1337" + props.Avatarurl
  // }

  let urls = []
  if (props.Imageurl) {

    for (let i=0; i<props.Imageurl.length; i++) {
      urls.push(props.Imageurl[i])
    }
  }

  if (props.MyName == props.SenderName) {
    return (
      <div className='Chat-Messages-ByMe'>
          <div className='Chat-Message-ByMe-Content'>
              <div className='Chat-Messages-ByMe-Container'>
                {props.MessageText}
              </div>
              <div className='Chat-Message-ByMe-Avatar'>
                  <img className='Chat-Message-ByMe-Avatar-Img' src={senderavatar} />
              </div>
          </div>
          { urls ?
          urls.map((d) => {
              return (
                <img key={d} className='Chat-Message-Img' src={strapirul + d} />
              )
          })
          :
              <p>Error loading Image!</p>
          }
          {/* <img className='Chat-Message-Img' src='http://localhost:1337/uploads/kekeny_logo_3dd6d4b1cb.svg'/> */}
      </div>

      // <div className='Chat-Message-Me'>
      //   <div className='Chat-Message-Me-Container'>
      //     <div className='Chat-Message-Me-Message'>
      //       <div className='Chat-Message-Me-Message-Main'>
      //         {props.MessageText}
      //       </div>
      //     </div>
      //     <div className='Chat-Message-Me-Avatar'>
      //       <img className='ProfileImg' src={senderavatar}/>
      //     </div>
      //   </div>
      //   { urls ?
      //     urls.map((d) => {
      //         return (
      //           <img key={d} className='Image' src={strapirul + d} />
      //         )
      //     })
      //     :
      //         <p>Error loading Image!</p>
      //     }
      // </div>
    )
  }
  else {
    return (
      <div className='Chat-Messages-ByOther'>
          <div className='Chat-Message-ByOther-Content'>
              <div className='Chat-Message-ByOther-Avatar'>
                  <img className='Chat-Message-ByOther-Avatar-Img' src={senderavatar} />
              </div>
              <div className='Chat-Messages-ByOther-Container'>
                  <div className='Chat-Message-ByOther-Name'>
                      {props.SenderName}
                  </div>
                  <div className='Chat-Message-ByOther-Text'>
                    {props.MessageText}
                  </div>
              </div>
          </div>
          { urls ?
          urls.map((d) => {
              return (
                <img key={d} className='Chat-Message-Img' src={strapirul + d} />
              )
          })
          :
              <p>Error loading Image!</p>
          }
      </div>
    )
  }
}

export default Message