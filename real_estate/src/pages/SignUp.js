import React, {useState } from 'react';
import '../styles/Authentication.css';
import axios from "axios";

const axiosInstance = axios.create({
  
    baseURL: "http://localhost:3001",
    withCredentials: true,
  
  });

export default function SignUp() {

    const [ registerUserName, setRegisterUsername ] = useState('');
    const [ resgisterPassword, setRegisterPassword ] = useState('');
    let message = "";
    
    const signup = async() => {
        let constraintsPassed = false;
        var state = document.querySelector('.login-state');
        if(registerUserName.length > 3){
            var passw=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
            if(resgisterPassword.match(passw)){
                constraintsPassed = true;
            }
            message = "password does not meet the constraints required.<h3><br>*6-20 characters long <br>*Contains one numeric number<br>*One upper case <br>*One lower case</h3>";
            state.style.position = "relative";
            state.parentNode.style.height = "65%";
            state.nextSibling.style.marginTop = "5%";
            
        }
        else{
            message = "user name is too short.";
            
        }
        if(constraintsPassed){
            await axiosInstance.post('/api/signup', {
                
                username: registerUserName,
                password: resgisterPassword
                
            }).then((res) => verifyAndLogin(res)).catch((err) => console.log(err));
        }
        state.innerHTML = message;
        

}

    const verifyAndLogin = async(res) => {
        
        if(res['data'] === "User created"){
            await axiosInstance.post('/api/login', {
                
                
                username: registerUserName,
                password: resgisterPassword
                
                
    
            }).then((res) => {login(res)}).catch(err => {console.log(err)});
        }
        else if(res['data'] === "User already exists"){
            message = "User already exists. Try again.";
            document.querySelector('.login-state').innerHTML = message;
        }
        else {
            message = "Please fill in all forms.";
            document.querySelector('.login-state').innerHTML = message;
        }
}

    const login = (res) => {
        console.log(res);
        if(res['data'] === "User logged in"){
          window.location = "/userform";
        }
      }

    return(
         <div className="register-cntr">
            <div className='register-card'>
            <span className='login-state'></span>
                <h1>SIGN UP</h1>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" onChange={e => setRegisterUsername(e.target.value)}></input>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={e => setRegisterPassword(e.target.value)}></input>
                <button onClick={signup} className='btn'>SIGN UP</button>
                <a className='redirect-user' href="/login" onClick={() => window.location="/login"}>Already a user? Sign in.</a>
            </div>
         </div>
    );
}

