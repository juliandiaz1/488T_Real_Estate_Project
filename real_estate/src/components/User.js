import React from "react";
import '../styles/User.css';
import {Link, Route, Routes} from "react-router-dom";
import SavedListing from "../pages/SavedListing";


export default function User(props){

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
            </Routes>
            {display_user(props)}
        </>
    )
}

