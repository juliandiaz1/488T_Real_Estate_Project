import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/Houses.css'
import House from '../components/House'
function Houses() {

    const [ houses, getHouses ] = useState('');
   
    
   function loadPython(){
        axios({
            method: 'GET',
            url: "http://localhost:3001/houses" 
        }).then((e) => {get_listing()}).catch((err) => console.log(err));;
    }
    
    const get_listing = async () => {
        await axios({
            method: 'GET',
            url: "http://localhost:3001/return_listings" 
        }).then(res => {
            document.querySelector("#loader").style = "display: none;"; 
            const houses = res.data;
            getHouses(houses);
        });
        
       
    }
    

   const display_listings = (listings) => {
        var parent = document.querySelector('.house-cntr');
        var jData = listings['data'];
        for(var i = 0; i < listings['data'].length; i++){
            // parent.innerHTML += `<House src=${jData[i]['imgSrc']} city=${jData[i]['hdpData.homeInfo.city']} state=${jData[i]['hdpData.homeInfo.state']} zipcode=${jData[i]['hdpData.homeInfo.zipcode']} beds=${jData[i]['beds']}/>`;
            parent.innerHTML += `<div class="house-card">
                                <div class="content">
                                 <img class="house-img" src=${jData[i]['imgSrc']}></img>
                                 <p>Price: ${jData[i]['price']}</p>
                                 <p>City: ${jData[i]['hdpData']['homeInfo']['city']}</p>
                                 <p>State: ${jData[i]['hdpData']['homeInfo']['state']}</p>
                                 <p>Zipcode: ${jData[i]['hdpData']['homeInfo']['zipcode']}</p>
                                 <p>#Bedroom's: ${jData[i]['beds']}</p>
                                 </div>
                                 </div>`;
        }
    }

    useEffect(() => {
        loadPython();
    }, []);

    return (
        <>
            <div id="loader">
                <div id="wave">
                        <span className="dot" style={{background: "rgb(66, 227, 154)"}}></span>
                        <span className="dot" style={{background: "rgb(8, 252, 244)"}}></span>
                        <span className="dot" style={{background: "rgb(66, 227, 154)"}}></span>
                </div>
                <div id="load-txt">Loading</div>
            </div>
            <div className="house-cntr">
                <House info={houses} />
            </div>
        </>
    )
    
    
}

export default Houses;