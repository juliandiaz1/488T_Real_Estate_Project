import React, { useState } from "react";
import Label from "./Label";
import '../styles/UserForm.css';
import axios from "axios";

function UserForm() {
    const [ fname, setFName ] = useState('');
    const [ lname, setLName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ phoneNumber, setPhoneNumber ] = useState('');
    

    // const checkUserInfo = () => {
        
    //     let cookies = document.cookie;
    //     if(cookies.length > 0){
    //         let res = cookies.split(";")[0].split("=")[1];
            
    //         axios({
    //             method: "post",
    //             data: {
    //                 id: res,
    //             },
    //             withCredentials: true,
    //             url: 'http://localhost:3001/getinfo',
    //         }).then((res) => fillUserInfo(res)).catch(err => console.log(err));
    //     }
    // }

    // const fillUserInfo = (res) => {
    //     if(res['data'] !== "No User" ){
    //         var fn = res['data']['fname'];
    //         var ln = res['data']['lname'];
    //         var eMail = res['data']['email'];
    //         var phone = res['data']['phone_number'];
            
    //         if(fn.length > 0){
    //             setFName(fn);
    //         }

    //         if(ln.length > 0){
    //             setLName(ln);
    //         }

    //         if(eMail.length > 0){
    //             setEmail(eMail);
    //         }

    //         if(phone.length > 0){
    //             setPhoneNumber(phone);
    //         }
    //     }
    // }
    const submitUserInfo = (res) => {
        
        axios({
            method: "post",
            data: {
                fname: fname,
                lname: lname,
                email: email,
                phone_number: phoneNumber,
            },
            withCredentials: true,
            url: 'http://localhost:3001/userinfo'
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

export default UserForm;