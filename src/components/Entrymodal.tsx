import React,{SyntheticEvent,useState} from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Navigate, useNavigate } from 'react-router-dom'
import Spinner from './Spinner'

export default function Entrymodal() {

    const walletAddress = useSelector((state:RootState)=>state.lp.walletAddress)
    const [credentials, setcredentials] = useState({
        username:"",
        pin:""
    })
    const navigate = useNavigate()
    const hideEntryModal = (e:SyntheticEvent) => {
        e.preventDefault()
        document.getElementById("EmOuter")!.style.display = "none"
    }
    const [loading, setloading] = useState(false)

    const handleOnChange=(e:SyntheticEvent)=>{
        const target = e.target as HTMLInputElement;
        setcredentials({
          ...credentials,
            [target.name]:target.value
        })
    }

    const handleOnSubmit=async(e:SyntheticEvent)=>{
        e.preventDefault();
        if(credentials.username === "" || credentials.pin ===  ""){
            return
        }
        if(credentials.username.length > 20){
            document.getElementById("usernameWarning")!.style.display = "block"
            return
        }
        if(credentials.pin.toString().length !== 4){
            document.getElementById("pinWarning")!.style.display = "block"
            return
        }
        
        try {
            const res = await fetch(`http://localhost:8000/auth/createUser`,{
                method:"POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body :JSON.stringify({
                  address:walletAddress,
                  username:credentials.username,
                  pin:credentials.pin
                })
              })
              if(res.ok){
                document.getElementById("EmOuter")!.style.display = "none"
                const resJSON = await res.json()
                sessionStorage.setItem("token",resJSON.token)
                sessionStorage.setItem("username",resJSON.username)
                navigate("/home")
              }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='EmOuter' id='EmOuter'>
            
            <div className='EntryModal'>
                <div className='EntryModalUpper'></div>
                <div className='EntryModalMiddle'>
                    
                        <div className='inputDiv'>
                            <label>Enter Username</label>
                            <input type='text' id='username' name="username" value={credentials.username} onChange={handleOnChange} placeholder='Username' />
                            <p className='warnings' id='usernameWarning'>Username should be less than 20 Characters</p>
                        </div>
                        <div className='inputDiv'>
                            <label>Enter a 4-Digit pin</label>
                            <input type='number' id='pin' name='pin' value={credentials.pin} onChange={handleOnChange} placeholder='pin' />
                            <p className='warnings' id='pinWarning'>Enter a four digit pin</p>
                        </div>
                    
                </div>
                <div className='EntryModalLower'>
                    <button className='modalBtn-inverted' onClick={hideEntryModal}>Cancel</button>
                    <button className='modalBtn' onClick={handleOnSubmit}>Submit</button>
                </div>
            </div>

        </div>
    )
}
