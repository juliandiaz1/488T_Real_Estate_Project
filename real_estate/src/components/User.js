import React from "react";



function User(props){

    const display_user = (props) => {
        let users = props.info;
        
        console.log(Object.keys(users));
        if(Object.keys(users).length > 0){
            return(
                Object.entries(users.data).map(([key, user]) => {
                    
                    return (
                        <div key={key}>
                            <h1>{user.fname}</h1>
                            <h1>{user.lname}</h1>
                            <h1>{user.email}</h1>
                            <h1>{user.phone_number}</h1>
                        </div>
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