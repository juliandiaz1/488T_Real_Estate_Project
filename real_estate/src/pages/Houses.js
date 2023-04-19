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