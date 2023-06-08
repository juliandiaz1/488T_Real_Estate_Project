import React from "react";
import axios from 'axios';
import CurrencyInput from 'react-currency-input-field';
import { useState } from "react";
import { useEffect } from "react";
import "../styles/MortgageCalc.css";
import StatesList from "../components/StatesList";
import "../styles/Graphs.css";

const axiosInstance = axios.create({
  
    baseURL: process.env.REACT_APP_AXIOS_URL,
    withCredentials: true,
  
});

function ROIspecs() {

    const [homePrice, setHomePrice] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [loanYears, setLoanYears] = useState('');
    const [interest, setInterest] = useState('');
    const [propertyTax, setPropertyTax] = useState('');
    const [insurancePrice, setInsurancePrice] = useState('');


    const hide = () => {
        try{
            document.querySelector("#user-fields").style="display: none;";
            document.querySelector("#User-box").style="display: none;";

            var x = document.querySelector("#accountlink");
            
            x.addEventListener('onlick', function(){
                window.location = '/account';
            });
        }
        catch(e){

        }
    }

    const calculate = async(event) => {
        event.preventDefault();
        const dollarComma = ['$', ','];
        const percentangeComma = [',', '%']
        const sentance = ['year(s)']
        let hp = removeFromString(homePrice, dollarComma);
        let dp = removeFromString(downPayment, dollarComma);
        let pt = removeFromString(propertyTax, dollarComma);
        let ip = removeFromString(insurancePrice, dollarComma);
        let ly = removeFromString(loanYears, sentance);
        let ir = removeFromString(interest, percentangeComma);
        
        
        setHomePrice(hp);
        setDownPayment(dp);
        setPropertyTax(pt);
        setInsurancePrice(ip);
        setLoanYears(ly);
        setInterest(ir);

        var x = document.getElementById("states");
        document.querySelector("#loader").style = "display: flex;";
        document.querySelector('.box').style = "display: none;";

        if(!Object.is(x, null)){
            try{
                var state = x.options[x.selectedIndex].value;
                var maxPrice = document.getElementById('max-price');
                maxPrice = maxPrice.options[maxPrice.selectedIndex].getAttribute('value');
                var beds = document.getElementById('beds');
                beds = beds.options[beds.selectedIndex].getAttribute('value');
                var baths = document.getElementById('baths');
                baths = baths.options[baths.selectedIndex].getAttribute('value');
            }
            catch(e){console.log("Error getting information")}
                
                await axiosInstance.post('/api/calculate_mortgage', {
                    homePrice: hp,
                    downPayment: dp,
                    propertyTax: pt,
                    insurancePrice: ip,
                    loanYears: ly,
                    interestRate: ir,
                    state: state,
                    max: maxPrice,
                    beds: beds,
                    baths: baths
                    
                }).then(e => {
                        document.querySelector("#loader").style = "display: none;";
                        document.querySelector('.box').style = "display: block;";
                        if(e['data'] === "No email found"){
                            alert("Sorry you don't have email alerts set up.");
                        }
                        else{
                            alert("An email has been sent out, please check it out.");
                        }
                    }
                ).catch(alert("Make sure to fill out all the correct information."));
                
            
        }
        
        
    }

    const removeFromString = (str, items) => {
        let temp = str;
        for(var i = 0; i <= items.length; i++){
            temp = temp.replaceAll(items[i], "");
        }
        
        return temp;
    }

    

    useEffect(() => {
        hide();
    }, []);

    return (
    <form className="box" id="Mortgage-Calculator">
        <div className="field">
            <label className="label">Monthly Payment</label>
            <div className="control">
                <CurrencyInput className="input" prefix="$" type="currency" onChange={e => setHomePrice(e.target.value)}/>
            </div>
        </div>
        <div className="field">
            <label className="label">Down Payment</label>
            <div className="control">
                <CurrencyInput className="input" prefix="$" type="currency" onChange={e => setDownPayment(e.target.value)}/>
            </div>
        </div>
        <div className="field">
            <label className="label">Loan Years</label>
            <div className="control">
                <CurrencyInput className="input" suffix=" year(s)" type="year" onChange={e => setLoanYears(e.target.value)}/>
            </div>
        </div>
        <div className="field">
            <label className="label">Interest Rate</label>
            <div className="control">
                <CurrencyInput className="input" suffix="%" type="percentange" onChange={e => setInterest(e.target.value)}/>
            </div>
        </div>
        <div className="field">
            <label className="label">Property Tax</label>
            <div className="control">
                <CurrencyInput className="input" prefix="$" type="currency" onChange={e => setPropertyTax(e.target.value)}/>
            </div>
        </div>
        <div className="field">
            <label className="label">Home Insurance</label>
            <div className="control">
                <CurrencyInput className="input" prefix="$" type="currency" onChange={e => setInsurancePrice(e.target.value)}/>
            </div>
        </div>
        <div className="filter-options">
            <StatesList />
            <section className="hero">
                        <div className="hero-body">
                        <div className="select is-medium slider">
                        <span>Max-Price:</span>
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
                    <div className="select is-medium slider">
                        <span>Baths: </span>
                        <select id="baths">
                            <option value={1}>1+</option>
                            <option value={2}>2+</option>
                            <option value={3}>3+</option>
                            <option value={4}>4+</option>
                        </select>
                    </div>
            </div>
            </section>
        </div>
        <button className="button is-black" onClick={calculate}>Calculate</button>
    </form>
    
    );
}

export default ROIspecs;