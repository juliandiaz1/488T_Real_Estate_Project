import React from "react";
import '../styles/User.css';


function User(props){

    const display_user = (props) => {
        let user = props.info;
    
        if(Object.keys(user).length > 0){
            return (
                <form className="box">
                    <div className="field">
                    <label className="label">First Name</label>
                    <div className="control">
                        <input className="input" type="name" placeholder={user.fname}></input>
                    </div>
                    </div>
                    <div className="field">
                    <label className="label">Last Name</label>
                    <div className="control">
                        <input className="input" type="name" placeholder={user.lname}></input>
                    </div>
                    </div>
                    <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input" type="email" placeholder={user.email}></input>
                    </div>
                    </div>
                    <div className="field">
                    <label className="label">Phone Number</label>
                    <div className="control">
                        <input className="input" type="name" placeholder={user.phone_number}></input>
                    </div>
                    </div>
                </form>
            )
        }else{
            return(<h1>Not logged in.</h1>)
        }
        
        
    }

    return(
        <>
            {display_user(props)}
        </>
    )
}

export default User;