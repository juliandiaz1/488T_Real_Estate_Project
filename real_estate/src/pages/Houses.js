import React from "react";
import axios from "axios";
import '../styles/Houses.css'

function Houses() {

   
    
   function loadPython(){
        axios({
            method: 'GET',
            url: "http://localhost:3001/houses" 
        }).then((e) => {get_listing()}).catch((err) => console.log(err));;
    }
    
    const get_listing = async () => {
        var ele = [];
        ele = await axios({
            method: 'GET',
            url: "http://localhost:3001/return_listings" 
        }).then(res => {document.querySelector("#loader").style = "display: none;"; display_listings(res); return res;});
        
       
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

    return (
        <>
            <div id="loader">
                <div id="wave">
                        <span class="dot" style={{background: "rgb(66, 227, 154)"}}></span>
                        <span class="dot" style={{background: "rgb(8, 252, 244)"}}></span>
                        <span class="dot" style={{background: "rgb(66, 227, 154)"}}></span>
                </div>
                <div id="load-txt">Loading</div>
            </div>
            <div className="house-cntr" onLoad={loadPython()}>
                
            </div>
        </>
    )
    
    
}

export default Houses;