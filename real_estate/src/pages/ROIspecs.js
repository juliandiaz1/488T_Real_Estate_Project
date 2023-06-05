import React from "react";
import axios from 'axios';
import CurrencyInput from 'react-currency-input-field';
import { useState } from "react";
import { useEffect } from "react";

function ROIspecs() {

    return (
    <form className="box" id="Mortgage Calculator">
        <div className="field">
            <label className="label">Home Price</label>
            <div className="control">
                <CurrencyInput className="input" prefix="$" type="currency"/>
            </div>
        </div>
        <div className="field">
            <label className="label">Down Payment</label>
            <div className="control">
                <CurrencyInput className="input" prefix="$" type="currency"/>
            </div>
        </div>
        <div className="field">
            <label className="label">Loan Years</label>
            <div className="control">
                <CurrencyInput className="input" suffix=" year(s)" type="year"/>
            </div>
        </div>
        <div className="field">
            <label className="label">Interest Rate</label>
            <div className="control">
                <CurrencyInput className="input" suffix="%" type="percentange"/>
            </div>
        </div>
        <div className="field">
            <label className="label">Property Tax</label>
            <div className="control">
                <CurrencyInput className="input" prefix="$" type="currency"/>
            </div>
        </div>
        <div className="field">
            <label className="label">Home Insurance</label>
            <div className="control">
                <CurrencyInput className="input" prefix="$" type="currency"/>
            </div>
        </div>
        <button className="button is-black">Calculate</button>
    </form>
    );
}

export default ROIspecs;