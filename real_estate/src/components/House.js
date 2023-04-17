import React from "react";
import '../styles/House.css';
import axios from "axios";
function House(props) {


    async function add_listing(val){
        
        document.getElementById("loader").css = "display: block;";

        await axios({
            method: 'post',
            data: {
                zpid: this.zpid,
                price: this.price,
                city: this.hdpData.homeInfo.city,
                state: this.hdpData.homeInfo.state,
                zip_code: this.hdpData.homeInfo.zipcode,
                beds: this.beds,
            },
            withCredentials: true,
            url: 'http://localhost:3001/add_listing',
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

        const filters = ['imgSrc', 'price', 'hdpData', 'beds'];

        const houses = props.info;

        if(Object.keys(houses).length > 0){
            return(
                Object.entries(houses).map(([key, val]) => {

                    try{
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
                    }catch{
                        console.log("Error getting a house with zpid: ", val.zpid);
                    }
                    // try{
                    //     console.log(val.hdpData.homeInfo.city);
                    // }catch{
                    //     console.log("info not avail");
                    // }
                    
                    // if(key in filters){
                    //     val.forEach(result => console.log(result));
                    // }
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

export default House;