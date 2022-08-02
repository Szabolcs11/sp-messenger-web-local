import React, { useState } from 'react'
import Style from './../style/FileUploadStyle.css'
import axios from 'axios'


export default function FileUpload({ callback }) {

    const [url, seturl] = useState();

    const handleChange = async (e) => {
        console.log(e.target.files)
        const src = URL.createObjectURL(e.target.files[0])
        // seturl(src)
        if (e.target.files.length > 0) {
            let srcs = []
            for (let i=0; i<e.target.files.length; i++) {
                srcs.push(e.target.files[i])
            }
            callback(srcs)
        }

        // if (e.target.files.length > 0) {
        //     let cbinfo = []
        //     let cburls = []
        //     for (let i=0; i<e.target.files.length; i++) {
        //         const data = new FormData()
        //         data.append('files', e.target.files[i])
        //         const cc_res = await axios({
        //             method: 'POST',
        //             url: 'http://localhost:1337/api/upload',
        //             data
        //         })
        //         // console.log(cc_res.data[0].url)
        //         const id = cc_res.data[0].id
        //         cbinfo.push(id)

        //         const url = cc_res.data[0].url
        //         const pushurl = "http://localhost:1337" + url
        //         cburls.push(pushurl)
        //         // console.log("File upload", id)
        //     }
        //     callback(cbinfo, cburls)
        //     e.preventDefault()
        //     e.target.value = null
        // }
            
    }

    return (
        // <div className='FileUpload'>
        //     <input type="file" onChange={handleChange}/>
        // </div>
        <div className="image-upload">
            <label htmlFor="file-input">
                <div className='ImageUpload-Container'>
                    <svg id='uploadicon' xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-upload" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                        <polyline points="7 9 12 4 17 9" />
                        <line x1="12" y1="4" x2="12" y2="16" />
                    </svg>
                </div>
            </label>

            <input multiple onChange={handleChange} id="file-input" type="file" />
        </div>
    )
}
