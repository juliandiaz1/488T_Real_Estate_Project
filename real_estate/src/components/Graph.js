import React, { useState } from 'react'
import Plot from 'react-plotly.js';
export default function Graph(props) {

    
    
    
    const displayGraph = (props) => {

        

        const houses = props.info;
        let i = 0;
        var arr = []
        var counter = []
        if(Object.keys(houses).length > 0){
            Object.entries(houses).map(([key, val]) => {

                try{
                    var price = Number(val.price.replace(/[$,]/g, ""));
                    
                    if((Number(props.filters.min) <= price && Number(props.filters.max) >= price) && props.filters.beds <= val.beds){
                        
                        arr.push(val.price);
                        counter.push(i);
                        i++;
                        
                    } // end of filter checker
                }catch{
                    console.log("Error getting a house with zpid: ", val.zpid);
                }
               
            })

            
            
            return(
                <Plot
                    data={[
                    {
                        x: arr,
                        y: counter,
                        type: 'bar',
                        marker: {
                            color: 'rgb(16, 32, 77)' 
                        },
                    },
                    
                    
                    ]}
                    
                    
                    layout={ {
                        width: 1200, 
                        height: 540, 
                        title: 'Price Data for ' + props.filters.state, 
                        xaxis: {
                                title: {
                                text: 'Price',
                                font: {
                                    family: '"Open Sans", verdana, arial, sans-serif',
                                    size: 30,
                                    color: '#7f7f7f'
                                }
                                },
                            },
                            yaxis: {
                                title: {
                                text: 'Count',
                                font: {
                                    family: '"Open Sans", verdana, arial, sans-serif',
                                    size: 30,
                                    color: '#7f7f7f'
                                }
                                }} 
                        }}
                />
            )
            

        }else{
            return(<h3>No Graph displayed!</h3>)
        }


    }


    return (
        <>
        {displayGraph(props)}
        </>
    )
}

