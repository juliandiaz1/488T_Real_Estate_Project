import React from "react";
import axios from 'axios';
import User from '../components/User';
import Listings from "../components/Listings";
import { useState } from "react";
import { useEffect } from "react";
import "../styles/Account.css";

const axiosInstance = axios.create({
  
    baseURL: "http://localhost:3001",
    withCredentials: true,
  
  });

function SavedListing(){

    const [ listing, setListing ] = useState('');
    const [ userinfo, setUserInfo ] = useState('');

    const account_info = async () => {
        await axiosInstance.get('/api/get_account').then(res => {
            const userinfo = res.data;
        
            console.log(res.data);
            setUserInfo(userinfo);
        });
    }
    

      const get_saved_listings = async () => {
        await axiosInstance.get('/api/saved_listings').then(res => setListing(res.data));
      }

      useEffect(() => {
        account_info();
        get_saved_listings();
    }, []);


    return( 
        <div className="saved-listings">
            <Listings listinginfo={listing}/>
        </div>
    );
}

export default SavedListing;