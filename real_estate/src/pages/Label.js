import React from 'react'
import '../styles/Label.css'

function Label({onChange, value, to, type}) {
  return (
    
    <div className='main-ctnr'>
        <label htmlFor={to}>{to}</label>
        <input onChange={onChange} value={value} name={to} type={type}></input>
    </div>
    
  )
}

export default Label;
