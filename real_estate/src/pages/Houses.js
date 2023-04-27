import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/Houses.css';
import House from '../components/House';
import Loader from "../components/Loader";
import StatesList from "../components/StatesList";

function Houses() {

    const [ houses, getHouses ] = useState('');
    const [houseData, setHouseData ] = useState('');
    
   function loadPython(houseDatas){
    console.log(houseDatas);
        axios({
            method: 'POST',
            data: {
                state: houseDatas.state,
            },
            url: "http://localhost:3001/api/houses" 
        }).then((e) => {get_listing()}).catch((err) => console.log(err));;
    }
    
    const get_listing = async () => {
        await axios({
            method: 'GET',
            url: "http://localhost:3001/api/return_listings" 
        }).then(res => {
            const houses = res.data;
            getHouses(houses);
            document.querySelector("#loader").style = "display: none;"; 
            document.querySelector('.house-cntr').style = "display: flex;";
        });
        
       
    }
    

    const chosen_state = () => {
        var x = document.getElementById("states");
        document.querySelector("#loader").style = "display: block;";
        document.querySelector('.house-cntr').style = "display: none;";
        if(!Object.is(x, null)){
            let state = x.options[x.selectedIndex].value;
            var minPrice = document.getElementById('min-price');
            minPrice = minPrice.options[minPrice.selectedIndex].getAttribute('value');
            var maxPrice = document.getElementById('max-price');
            maxPrice = maxPrice.options[maxPrice.selectedIndex].getAttribute('value');
            var beds = document.getElementById('beds');
            beds = beds.options[beds.selectedIndex].getAttribute('value');
            let houseFilter = {
                state: state,
                min: minPrice,
                max: maxPrice,
                beds: beds,
            }
           
            setHouseData(houseFilter);
            loadPython(houseFilter);
        }
    }

    

    
    

    return (
        <>
            <Loader />
            <div className="filter-options">
                <StatesList />
                <div className="">
                <section className="hero">
                     <div className="hero-body">
                        <div className="select is-medium slider">
                            <span>Price: </span>
                            <select id="min-price">
                                <option value={0}>$0</option>
                                <option value={100000}>$100,000</option>
                                <option value={200000}>$200,000</option>
                                <option value={300000}>$300,000</option>
                                <option value={400000}>$400,000</option>
                                <option value={500000}>$500,000</option>
                                <option value={600000}>$600,000</option>
                                <option value={700000}>$700,000</option>
                                <option value={800000}>$800,000</option>
                                <option value={900000}>$900,000</option>
                                
                            </select>
                            <span>-</span>
                            <select id="max-price">
                                <option value={500000}>$500,000</option>
                                <option value={600000}>$600,000</option>
                                <option value={700000}>$700,000</option>
                                <option value={800000}>$800,000</option>
                                <option value={900000}>$900,000</option>
                                <option value={1000000}>$1M</option>
                                <option value={1250000}>$1.25M</option>
                                <option value={1500000}>$1.5M</option>
                                <option value={1750000}>$1.75M</option>
                                <option value={9000000}>Any Price</option>
                            </select>
                        </div>
                    </div>
                </section>
                </div>
                
                <section className="hero">
                     <div className="hero-body">
                        <div className="select is-medium slider">
                            <span>Beds: </span>
                            <select id="beds">
                                <option value={1}>1+</option>
                                <option value={2}>2+</option>
                                <option value={3}>3+</option>
                                <option value={4}>4+</option>
                            </select>
                        </div>
                    </div>
                </section>
                <button className="filter-submit" onClick={chosen_state}>Submit</button>
            </div>
            <div className="house-cntr is-rounded">
                <House info={houses} filters={houseData}/>
            </div>
        </>
    )
    
    
}

export default Houses;