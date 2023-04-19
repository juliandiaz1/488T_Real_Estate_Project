import React from "react";
import '../styles/Loader.css';
export default function Loader(){

    return (
        <div id="loader">
                <div id="wave">
                        <span className="dot" style={{background: "rgb(66, 227, 154)"}}></span>
                        <span className="dot" style={{background: "rgb(8, 252, 244)"}}></span>
                        <span className="dot" style={{background: "rgb(66, 227, 154)"}}></span>
                </div>
                <div id="load-txt">Loading</div>
        </div>
    )
}