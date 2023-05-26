import React from "react"
import axios from "axios";
import '../styles/House.css';

export default function Listings(props) {

    const displayHouses = (props) => {

        

        const houses = props.listinginfo;
        
       
        
       if(houses == "no user found."){
            return (
                <h1>No saved listings</h1>
            )
       }


       const axiosInstance = axios.create({
  
        baseURL: process.env.REACT_APP_AXIOS_URL,
        withCredentials: true,
      
    });

    async function delete_listing(val){
        
        document.getElementById("loader").css = "display: block;";

        await axiosInstance.post('/api/delete_listing', {

            zpid: this.zpid,
            
            
        }).then(e => {
            console.log(e);
            if(e.data === "Deleted"){
                window.location = "/account/SavedListing";
            }
            else{
                alert("Please Log in.");
            }
        })
    }

        
        if(Object.keys(houses).length > 0){
            return(
                Object.entries(houses).map(([key, val]) => {

                    try{
                        
                        return (
                            <div key={key} className="house-card">
                                <button className="delete" onClick={delete_listing.bind(val)} value={key}></button>
                                <div className="content">
                                    <img className="house-img" src={val.imgSrc}></img>
                                    <p>Price: {val.price}</p>
                                    <p>City: {val.city}</p>
                                    <p>State: {val.state}</p>
                                    <p>Zip-Code: {val.zipcode}</p>
                                    <p>Bedrooms: {val.beds}</p>
                                </div>
                            </div>
                        )
                        
                    }catch{
                        console.log("Error getting a house with zpid: ", val.zpid);
                    }
                    
                })
            )
        }else{
            return(<h3>No Listings!</h3>)
        }


    }

    return (
        <>
        {displayHouses(props)}
        </>
    )
}