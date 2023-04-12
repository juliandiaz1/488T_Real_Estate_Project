import { useState } from 'react';
import '../styles/Authentication.css';
import axios from 'axios';
import { redirect } from 'react-router-dom';
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
            <div className='register-card'>
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