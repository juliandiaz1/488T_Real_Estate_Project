import { useState } from 'react';
import '../styles/Authentication.css';
import axios from 'axios';

function Login() {

    const [ loginUserName, setLoginUsername ] = useState('');
    const [ loginPassword, setLoginPassword ] = useState('');

    const login = () => {
        axios({
          method: 'post',
          data: {
            username: loginUserName,
            password: loginPassword
          },
          withCredentials: true,
          url: 'http://localhost:3001/login',
          

        }).then(res => {verifyLogin(res)}).catch(err => {console.log(err)});
       
    }

    const verifyLogin = (res) => {
      console.log(res);
      if(res['data'] === "User logged in"){
        axios({
          method: 'get',
          withCredentials: true,
          url: 'http://localhost:3001/getuser',

        }).then(res => console.log(res)).then(window.location = "/").catch(e => console.log(e));
        
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
            </div>
         </div>
    );
}

export default Login;