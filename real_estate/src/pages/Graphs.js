import React, { useState } from 'react'
import Loader from '../components/Loader';
import StatesList from '../components/StatesList';
import Graph from '../components/Graph';
import axios from 'axios';
import '../styles/Graphs.css';

const axiosInstance = axios.create({
  
    baseURL: process.env.REACT_APP_AXIOS_URL,
    withCredentials: true,
  
});

export default function Graphs() {

    const [ houses, getHouses ] = useState('');
    const [houseData, setHouseData ] = useState('');

    const loadPython = async(houseDatas) => {
    
        await axiosInstance.post('/api/houses', {
            
            state: houseDatas.state,
            zip: houseDatas.zipcode,
            
        }).then((e) => {get_listing()}).catch((err) => console.log(err));;
    }
    
    const get_listing = async () => {
        await axiosInstance.get('/api/return_listings').then(res => {
            const houses = res.data;
            getHouses(houses);
            document.querySelector("#loader").style = "display: none;"; 
            document.querySelector('.main-cntr').style = "display: flex;";
        });
    }

    const chosen_state = () => {
        var x = document.getElementById("states");
        document.querySelector("#loader").style = "display: flex;";
        document.querySelector('.main-cntr').style = "display: none;";
        if(!Object.is(x, null)){
            let state = x.options[x.selectedIndex].value;
            var minPrice = document.getElementById('min-price');
            minPrice = minPrice.options[minPrice.selectedIndex].getAttribute('value');
            var maxPrice = document.getElementById('max-price');
            maxPrice = maxPrice.options[maxPrice.selectedIndex].getAttribute('value');
            var beds = document.getElementById('beds');
            beds = beds.options[beds.selectedIndex].getAttribute('value');
            var zip = document.getElementById('zip');
            zip = zip.value;
            let houseFilter = {
                state: state,
                min: minPrice,
                max: maxPrice,
                beds: beds,
                zipcode: zip,
            }
            setHouseData(houseFilter);
            loadPython(houseFilter);
            
        }
    }

  return(
    <>
    <Loader />
    <div className='main-cntr'>
        
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
            <section className="hero">
                     <div className="hero-body">
                        <input className="input" id="zip" placeholder="Zip-code:"></input>
                    </div>
            </section>
            <button className="filter-submit" onClick={chosen_state}>Submit</button>
        </div>
        <div className='graph'>
            <Graph info={houses} filters={houseData}/>
        </div>
    </div>
    </>
  )
}

