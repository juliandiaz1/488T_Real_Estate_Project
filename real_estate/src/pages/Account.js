import React, {useEffect, useState} from "react";
import axios from 'axios';
import User from '../components/User';
import '../styles/Account.css';
import ProfilePic from '../images/user_profile_picture.jpeg';
import Loader from "../components/Loader";

const axiosInstance = axios.create({
  
    baseURL: process.env.REACT_APP_AXIOS_URL,
    withCredentials: true,
  
  });

export default function Account(){

    const [userinfo, setUserInfo] = useState('');
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const [profile, setProfile] = useState(ProfilePic);
    
    const display_info = async () => {
        await axiosInstance.get('/api/get_account').then(res => {
            const userinfo = res.data;
            try{
                if(res.data.imgSrc !== undefined){
                    setProfile(userinfo.imgSrc);
                }
            }catch{

            }
            setUserInfo(userinfo);
            document.getElementById("loader").style = "display: none;"});
    }


    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      };

    const postPhoto = async event => {
        event.preventDefault();
    
        // Send the file and description to the server
        const formData = new FormData();
        formData.append("image", file);

        try{
            // const result = await axios.post("process.env.REACT_APP_AXIOS_URL/api/images", formData, { headers: {'Content-Type': 'multipart/form-data'}});
            await axiosInstance.post('/api/images', formData, {
                
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }

            }).then(e => {console.log(e); redirect()});
            
        }catch(error){
            console.log(error);
        }
        
      }

      const redirect = () => {
        window.location = "/account";
      }

      const show = () => {
        document.querySelector(".box").style="display: block;";
        document.querySelector("#User-box").style="display: block;";
    }
      

      useEffect(() => {
        display_info();
        show();
    }, []);

      
      
    

    return (
        <>
        <Loader />
            <div className="main">
                <div className="account-cntr">
                    <User info={userinfo} />
                </div>
                <div>
                    <form className="box" id="User-box">
                        <figure className="image" id="default-pic">
                            <img className="is-rounded" src={profile} alt="Profile Picture"></img>
                            <input filename={file} onChange={saveFile} type="file" accept="image/*"></input>
                            <button onClick={postPhoto} className="button is-fullwidth">Upload photo</button>
                        </figure>
                    </form>
                </div>
            </div>
        </>
    )
}

