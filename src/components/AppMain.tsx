import React, { useEffect } from 'react'
import Navigation from './Navigation'

export default function AppMain() {

  useEffect(() => {
    if(!sessionStorage.getItem("token")){
      window.location.href = "/"
    }
  }, [])
  

  return (
    <div><Navigation/></div>
  )
}
