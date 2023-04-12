import { useState } from 'react';
import '../styles/Authentication.css';
import axios from "axios";

function SignUp() {

    const [ registerUserName, setRegisterUsername ] = useState('');
    const [ resgisterPassword, setRegisterPassword ] = useState('');

    const signup = () => {
        axios({
            method: "post",
            data: {
                username: registerUserName,
                password: resgisterPassword
            },
            withCredentials: true,
            url: 'http://localhost:3001/signup'
        }).then((res) => console.log(res)).catch((err) => console.log(err));
    }

    return(
         <div className="register-cntr">
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