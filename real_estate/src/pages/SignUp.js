import React, { useEffect, useState } from 'react';
import '../styles/Authentication.css';
import axios from "axios";

function SignUp() {

    const [ registerUserName, setRegisterUsername ] = useState('');
    const [ resgisterPassword, setRegisterPassword ] = useState('');
    let message = "";
    
    const signup = () => {
        axios({
            method: "post",
            data: {
                username: registerUserName,
                password: resgisterPassword
            },
            withCredentials: true,
            url: 'http://localhost:3001/signup'
        }).then((res) => verifyAndLogin(res)).catch((err) => console.log(err));
    }

    const verifyAndLogin = (res) => {
        if(res['data'] === "User created"){
            axios({
                method: 'post',
                data: {
                username: registerUserName,
                password: resgisterPassword
                },
                withCredentials: true,
                url: 'http://localhost:3001/login',
                
    
            }).then((res) => {verifyLogin(res)}).catch(err => {console.log(err)});
        }
        else{
            message = "User already exists. Try again.";
        }
}

    const verifyLogin = (res) => {
      
        if(res['data'] === "User logged in"){
          axios({
            method: 'get',
            withCredentials: true,
            url: 'http://localhost:3001/getuser',
  
          }).then(res => console.log(res));
          window.location = "/";
          
        }
      }

    return(
         <div className="register-cntr">
            <h1>{}</h1>
            <div className='register-card'>
                <h1>SIGN UP</h1>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" onChange={e => setRegisterUsername(e.target.value)}></input>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={e => setRegisterPassword(e.target.value)}></input>
                <button onClick={signup} className='btn'>SIGN UP</button>
            </div>
         </div>
    );
}

export default SignUp;