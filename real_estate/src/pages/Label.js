import React from 'react'
import '../styles/Label.css'

export default function Label({onChange, value, to, type}) {
  return (
    
    <div className='main-ctnr'>
        <label htmlFor={to}>{to}</label>
        <input onChange={onChange} value={value} name={to} type={type}></input>
    </div>
    
  )
}


