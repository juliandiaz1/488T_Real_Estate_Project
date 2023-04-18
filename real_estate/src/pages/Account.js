import React, {useEffect, useState} from "react";
import axios from 'axios';
import User from '../components/User';
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
        </div>
    )
}

export default Account;