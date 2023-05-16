import React, {useEffect, useState} from "react";
import axios from 'axios';
import User from '../components/User';
import '../styles/Account.css';
import ProfilePic from '../images/user_profile_picture.jpeg';
import Loader from "../components/Loader";
import Listings from "../components/Listings";
import {Link, Route, Routes} from "react-router-dom";
import SavedListing from "./SavedListing";

const axiosInstance = axios.create({
  
    baseURL: process.env.REACT_APP_AXIOS_URL,
    withCredentials: true,
  
  });

export default function Account(){

    const [userinfo, setUserInfo] = useState('');
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const [ listing, setListing ] = useState('');
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
        event.preventDefault()
    
        // Send the file and description to the server
        const formData = new FormData();
        formData.append("image", file);

        try{
            // const result = await axios.post("process.env.REACT_APP_AXIOS_URL/api/images", formData, { headers: {'Content-Type': 'multipart/form-data'}});
            await axiosInstance.post('/api/images', formData, {
                
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }

            }).then(window.location="/account");
            
        }catch{

        }
        
      }

      

      const get_saved_listings = async () => {
        await axiosInstance.get('/api/saved_listings').then(res => setListing(res.data));

      }

      useEffect(() => {
        display_info();
        get_saved_listings();
    }, []);

      
      
    

    return (
        <div>
            <Loader />
    
             <div className="account-cntr">
             {/* <Routes>
                <Route path="/account/" element={<User info={userinfo} />}>
                    <Route path="SavedListing" element={<SavedListing />} ></Route>
                </Route>
                
            </Routes> */}
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

                <div className="saved-listings">
                    <Listings listinginfo={listing}/>
                </div>
            </div>
            
       </div>
    )
}

