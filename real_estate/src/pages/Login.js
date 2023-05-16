import React, { useState } from 'react';
import '../styles/Authentication.css';
import axios from 'axios';



export default function Login() {

    const [ loginUserName, setLoginUsername ] = useState('');
    const [ loginPassword, setLoginPassword ] = useState('');

    const axiosInstance = axios.create({
  
      baseURL: process.env.REACT_APP_AXIOS_URL,
      withCredentials: true,
    
    });
    
    
    
    const login = async() => {
        await axiosInstance.post('/api/login', {
            
          username: loginUserName,
          password: loginPassword,

        }).then(res => { verifyLogin(res)}).catch(err => {console.log(err)});
       
    }

    const verifyLogin = (res) => {

      
      if(res['data'] === "User logged in"){

        window.location = "/";
        
      }
      else{

        document.querySelector('.login-state').innerHTML = "Login Failed. Incorrect user name and/or password."

      }
    }

    return(
         <div className="register-cntr">
            <div className='register-card'>
            <span className="login-state"></span>
                <h1>LOGIN</h1>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" onChange={e => setLoginUsername(e.target.value)} required></input>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={e => setLoginPassword(e.target.value)} required></input>
                <button onClick={login} className='btn'> LOGIN</button>
                <a className='redirect-user' href="/signup"  onClick={() => window.location="/signup"}>Not already a user? Sign up here.</a>
            </div>
         </div>
    );
}

