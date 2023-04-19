import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/Houses.css';
import House from '../components/House';
import Loader from "../components/Loader";
import StatesList from "../components/StatesList";
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
            const houses = res.data;
            getHouses(houses);
            document.querySelector("#loader").style = "display: none;"; 
        });
        
       
    }
    

    useEffect(() => {
        loadPython();
    }, []);

    return (
        <>
            <Loader />
            <StatesList />
            <div className="house-cntr">
                <House info={houses} />
            </div>
        </>
    )
    
    
}

export default Houses;