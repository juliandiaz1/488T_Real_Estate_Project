import React, { useState } from "react";
import Label from "./Label";
import '../styles/UserForm.css';
import axios from "axios";


const axiosInstance = axios.create({
  
    baseURL: "http://localhost:3001",
    withCredentials: true,
  
  });


export default function UserForm() {
    const [ fname, setFName ] = useState('');
    const [ lname, setLName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ phoneNumber, setPhoneNumber ] = useState('');
    
    
    
    const submitUserInfo = async(res) => {
        
        await axiosInstance.post('/api/userinfo', {
            
            fname: fname,
            lname: lname,
            email: email,
            phone_number: phoneNumber,
            
        }).then(res => {window.location = "/"});
    }

    

    
    
    return (
        <>
            <div className="user-form-cntr">
                <div className="user-form">
                    <h2 className="titles">Account Information</h2>
                    <div className="labels">
                        <Label onChange={e => setFName(e.target.value)} value={fname} to={"First Name:"} type={"text"}/>
                        <Label onChange={e => setLName(e.target.value)} value={lname} to={"Last Name:"} type={"text"}/>
                        <Label onChange={e => setEmail(e.target.value)} value={email} to={"Email:"} type={"email"}/>
                        <Label onChange={e => setPhoneNumber(e.target.value)} value={phoneNumber} to={"Phone Number:"} type={"tel"}/>
                    </div>
                    <button className="submit-btn" onClick={submitUserInfo}>Submit</button>
                </div>
            </div>
        </>
    );
}

