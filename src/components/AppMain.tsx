import React, { useEffect } from 'react'
import Navigation from './Navigation'
import Home from './Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Send from './Send';

export default function AppMain() {

  useEffect(() => {
    if(!sessionStorage.getItem("token")){
      window.location.href = "/"
    }
  }, [])
  

  return (
    <div className='appMainOuter'>
      
      <Navigation/>
      {window.location.href.endsWith("home") && <Home/>}
      {window.location.href.endsWith("send") && <Send/>}    
    </div>
  )
}
