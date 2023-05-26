import React from "react";
import '../styles/User.css';
import {Link, Route, Routes, redirect} from "react-router-dom";
import SavedListing from "../pages/SavedListing";
import ROIspecs from "../pages/ROIspecs";
import axios from "axios";


const axiosInstance = axios.create({
  
    baseURL: process.env.REACT_APP_AXIOS_URL,
    withCredentials: true,
  
});

export default function User(props){
    
    async function updateInfo(userInfo){
        userInfo.preventDefault();
        
        var x = document.querySelectorAll('.input');
        let fname = x[0].value;
        let lname = x[1].value;
        let email = x[2].value;
        let phone_number = x[3].value
        
        await axiosInstance.post('/api/updateUserInfo', {
            fname: fname,
            lname: lname,
            email: email,
            phone: phone_number,
        }).then(res => {
            if(res.data === "Updated account info"){
                redirectUser();
            }
            else{
                alert("Unable to update account info at this time, sorry.")
            }
        });
        
    }

    const redirectUser = () => {
        window.location = "/account";
    }

    const display_user = (props) => {
        let user = props.info;
        if(user !== "No user found"){
            if(Object.keys(user).length > 0){
                return (
                    <form className="box">
                        <nav className="navbaruser is-transparent">
                            <div className="navbar-start">
                            <label className="navbar-item">User Information</label>
                                <Link className="navbar-item" to={"/account/SavedListing"}>Saved Listings</Link>
                                <Link className="navbar-item" to={"/account/ROIspecs"}>ROI Information</Link>
                            </div>
                        </nav>
                        <div className="field">
                        <label className="label">First Name</label>
                        <div className="control">
                            <input className="input" type="name" defaultValue={user.fname}></input>
                        </div>
                        </div>
                        <div className="field">
                        <label className="label">Last Name</label>
                        <div className="control">
                            <input className="input" type="name" defaultValue={user.lname}></input>
                        </div>
                        </div>
                        <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input className="input" type="email" defaultValue={user.email}></input>
                        </div>
                        </div>
                        <div className="field">
                        <label className="label">Phone Number</label>
                        <div className="control">
                            <input className="input" type="name" defaultValue={user.phone_number}></input>
                        </div>
                        <button className="button is-black" onClick={updateInfo}>Update</button>
                        </div>
                    </form>
                )
            }
        }else{
            return(<h1>Not logged in.</h1>)
        }
        
        
    }

    console.count();

    return(
        <>
            <Routes>
                <Route path="/SavedListing" element={<SavedListing />}></Route>
                <Route path="/ROIspecs" element={<ROIspecs />}></Route>
            </Routes>
            {display_user(props)}
        </>
    )
}

