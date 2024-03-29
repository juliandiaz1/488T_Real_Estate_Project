import React from "react";
import '../styles/House.css';
import axios from "axios";


export default function House(props) {


    const axiosInstance = axios.create({
  
        baseURL: process.env.REACT_APP_AXIOS_URL,
        withCredentials: true,
      
    });

    async function add_listing(val){
        
        document.getElementById("loader").css = "display: block;";

        await axiosInstance.post('/api/add_listing', {
            
            
            zpid: this.zpid,
            price: this.price,
            city: this.hdpData.homeInfo.city,
            state: this.hdpData.homeInfo.state,
            zip_code: this.hdpData.homeInfo.zipcode,
            beds: this.beds,
            imgSrc: this.imgSrc,
            
            
            
            
        }).then(e => {
            if(e.data === "Already added."){
                alert("Already added listing.");
            }
            else if (e.data === "Listing added!"){
                console.log(e.data);
                document.getElementById("loader").css = "display: none;";
                var child = val.target.childNodes[1];
                val.target.innerText = e.data;
                val.target.appendChild(child);
                child.style = "display: inline-block";
            }
            else{
                alert("Please Log in.");
            }
        })
    }


    const displayHouses = (props) => {

        
        
        if(props.info !== undefined && props.info !== null && props.info !== ""){
            let houses = props.info;
            houses = JSON.parse(houses);
            
            if(Object.keys(houses).length > 0){
                return(
                    Object.entries(houses).map(([key, val]) => {
                        try{
                            var price = Number(val.price.replace(/[$,]/g, ""));
                            
                            if((Number(props.filters.min) <= price && Number(props.filters.max) >= price) && props.filters.beds <= val.beds){
                                
                            
                                return (
                                    <div key={key} className="house-card">
                                        <div className="content">
                                            <img className="house-img" src={val.imgSrc}></img>
                                            <p>Price: {val.price}</p>
                                            <p>City: {val.hdpData.homeInfo.city}</p>
                                            <p>State: {val.hdpData.homeInfo.state}</p>
                                            <p>Zip-Code: {val.hdpData.homeInfo.zipcode}</p>
                                            <p>Bedrooms: {val.beds}</p>
                                            <button className="add-listing" onClick={add_listing.bind(val)} value={key}>add listing<div id="tick-mark" style={{display: "none"}}></div></button>
                                        </div>
                                    </div>
                                )
                            } // end of filter checker
                        }catch{
                            console.log("Error getting a house with zpid: ", val.zpid);
                        }
                    
                    })
                )
            }else{
                return(<h3>No Listings!</h3>)
            }
    }


    }


    return (
        <>
        {displayHouses(props)}
        </>
    )

}

