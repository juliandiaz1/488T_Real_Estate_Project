import React from "react";
import '../styles/User.css';


function User(props){

    const display_user = (props) => {
        let users = props.info;
        
        console.log(Object.keys(users));
        if(Object.keys(users).length > 0){
            return(
                Object.entries(users.data).map(([key, user]) => {
                    
                    return (
                        <form key={key} className="box">
                        <div className="field">
                        <label className="label">First Name</label>
                        <div class="control">
                            <input class="input" type="name" placeholder={user.fname}></input>
                        </div>
                        </div>
                        <div className="field">
                        <label className="label">Last Name</label>
                        <div class="control">
                            <input class="input" type="name" placeholder={user.lname}></input>
                        </div>
                        </div>
                        <div className="field">
                        <label className="label">Email</label>
                        <div class="control">
                            <input class="input" type="email" placeholder={user.email}></input>
                        </div>
                        </div>
                        <div className="field">
                        <label className="label">Phone Number</label>
                        <div class="control">
                            <input class="input" type="name" placeholder={user.phone_number}></input>
                        </div>
                        </div>
                    </form>
                    )
                })
            )
        }else{
            return(
                <h1>Not logged in.</h1>
            )
        }
        
        
    }

    return(
        <>
            {display_user(props)};
        </>
    )
}

export default User;