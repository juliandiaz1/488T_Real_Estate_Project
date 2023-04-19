import React, {useEffect, useState} from "react";
import axios from 'axios';
import User from '../components/User';
import '../styles/Account.css';
import ProfilePic from '../images/user_profile_picture.jpeg';
import Loader from "../components/Loader";

function Account(){

    const [userinfo, setUserInfo] = useState('');
    
    const display_info = async () => {
        await axios({
            method: "get",
            url: "http://localhost:3001/get_account",
            withCredentials: true,
        }).then(res => {
            const userinfo = res.data;
            setUserInfo(userinfo);
            document.getElementById("loader").style = "display: none;"});
    }


    useEffect(() => {
        display_info();
        
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
           <img className="is-rounded" src={ProfilePic} alt="Profile Picture"></img>
           </figure>
       </form>
       </div>
        </div>
    )
}

export default Account;