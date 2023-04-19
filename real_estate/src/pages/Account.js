import React, {useEffect, useState} from "react";
import axios from 'axios';
import User from '../components/User';
import '../styles/Account.css';

function Account(){

    const [userinfo, setUserInfo] = useState('');
    
    const display_info = async () => {
        await axios({
            method: "get",
            url: "http://localhost:3001/get_account",
            withCredentials: true,
        }).then(res => {
            
            setUserInfo(res)});
    }


    useEffect(() => {
        display_info();
    }, []);

    return (
        <div>
             <div className="account-cntr">
                <User info={userinfo} />
            </div>
            <div>
       <form className="box" id="User-box">
           <p>Random text</p>
       </form>
       </div>
        </div>
    )
}

export default Account;