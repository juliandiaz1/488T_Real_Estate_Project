import React from "react";
import '../styles/User.css';


export default function User(props){

    const display_user = (props) => {
        let user = props.info;
        if(user !== "No user found"){
            if(Object.keys(user).length > 0){
                return (
                    <form className="box">
                        <nav className="navbaruser is-transparent">
                            <div className="navbar-start">
                            <a className="navbar-item">User Information</a>
                            <a className="navbar-item">Saved Listings</a>
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
            {display_user(props)}
        </>
    )
}

