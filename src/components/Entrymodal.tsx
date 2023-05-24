import React,{SyntheticEvent,useState} from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Navigate, useNavigate } from 'react-router-dom'

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

    const handleOnChange=(e:SyntheticEvent)=>{
        const target = e.target as HTMLInputElement;
        setcredentials({
          ...credentials,
            [target.name]:target.value
        })
    }

    const handleOnSubmit=async(e:SyntheticEvent)=>{
        e.preventDefault();
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
                navigate("/dashboard")
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
                        </div>
                        <div className='inputDiv'>
                            <label>Enter pin</label>
                            <input type='number' id='pin' name='pin' value={credentials.pin} onChange={handleOnChange} placeholder='pin' />
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
