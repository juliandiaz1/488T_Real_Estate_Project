import React, {useEffect, useState} from "react";
import axios from 'axios';
import User from '../components/User';
import '../styles/Account.css';
import ProfilePic from '../images/user_profile_picture.jpeg';
import Loader from "../components/Loader";
import Listings from "../components/Listings";


function Account(){

    const [userinfo, setUserInfo] = useState('');
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const [ listing, setListing ] = useState('');

    const [profile, setProfile] = useState(ProfilePic);
    
    const display_info = async () => {
        await axios({
            method: "get",
            url: "http://localhost:3001/api/get_account",
            withCredentials: true,
        }).then(res => {
            const userinfo = res.data;
            try{
                if(res.data.imgSrc != undefined){
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
            // const result = await axios.post("http://localhost:3001/api/images", formData, { headers: {'Content-Type': 'multipart/form-data'}});
            await axios({
                method: "post",
                data: formData,
                withCredentials: true,
                headers: {
                    'Content-Type' : 'multipart/form-data'
                },
                url: "http://localhost:3001/api/images"
            })
            
        }catch{

        }
        
      }

      

      const get_saved_listings = async () => {
        await axios({
            method: 'get',
            url: 'http://localhost:3001/api/saved_listings',
            withCredentials: true
            
        }).then(res => setListing(res.data));

      }

      useEffect(() => {
        display_info();
        get_saved_listings();
    }, []);

      
      
    

    return (
        <div>
            <Loader />
            
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

                <div className="saved-lsitings">
                    <Listings listinginfo={listing}/>
                </div>
            </div>
       </div>
    )
}

export default Account;