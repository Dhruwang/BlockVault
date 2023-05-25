import React, { useEffect } from 'react'
import Navigation from './Navigation'
import Home from './Home'

export default function AppMain() {

  useEffect(() => {
    if(!sessionStorage.getItem("token")){
      window.location.href = "/"
    }
  }, [])
  

  return (
    <div className='appMainOuter'>
      <Navigation/>
      <Home />
      
    </div>
  )
}
