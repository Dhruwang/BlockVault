import React, { useState, useEffect } from 'react'
import Web3 from 'web3';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { lpActions } from '../store/landingPage';
import { useNavigate } from 'react-router-dom';
import Entrymodal from './Entrymodal';
import Spinner from './Spinner';

export default function Landing() {

  const [web3, setWeb3] = useState<Web3 | undefined>(undefined);
  const [showSpinner, setShowSpinner] = useState(false)
  const dispatch = useDispatch();
  const walletAddress = useSelector((state: RootState) => state.lp.walletAddress)
  const navigate = useNavigate();

  const connectToMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access if needed
        await window.ethereum.enable();

        // Create a new Web3 instance
        const web3Instance = new Web3(window.ethereum);

        // Set the Web3 instance to the component state
        setWeb3(web3Instance);

      } catch (error) {
        // Handle error if user rejects or if MetaMask is not installed
        console.error(error);
      }
    } else {
      // Display a message to install MetaMask if it's not detected
      console.log('Please install MetaMask');
    }
  };

  const handleLandingPageSubmit = async () => {
    if (!walletAddress) {
      return;
    }

    setShowSpinner(true);
    try {
      const res = await fetch(`http://localhost:8000/auth/checkIsProfileCompleted?address=${walletAddress}`)
      const isProfileCompleted = await res.json()
      if (isProfileCompleted.error === "User not found") {
        const res = await fetch(`http://localhost:8000/auth/createUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address: walletAddress
          })
        })
        if (res.ok) {
          showEntryModal()
          setShowSpinner(false)
        }
      }
      if (!isProfileCompleted) {
        showEntryModal()
        setShowSpinner(false)
      }
      else {
        console.log("running")
        handleLogin()
        
      }
    } catch (error) {
      console.log(error)
    }


  }

  const handleLogin = async()=>{
    const res = await fetch(`http://localhost:8000/auth/loginUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: walletAddress
      })
    })
    const resJSON = await res.json();
    const token = resJSON.token;
    const username = resJSON.username;

    // setting value of username 


    sessionStorage.setItem("token", token);
    sessionStorage.setItem("username", username);
    navigate("/home")
    setShowSpinner(false)
  }

  const showEntryModal = () => {
    document.getElementById("EmOuter")!.style.display = "flex"
  }


  const getWalletAddress = async () => {
    if (web3) {
      const accounts = await web3.eth.getAccounts();
      dispatch(lpActions.connectWallet(accounts[0]));
    }
  };

  useEffect(() => {
    connectToMetaMask()
  }, [])

  useEffect(() => {
      getWalletAddress();
    
  }, [web3])

  window.ethereum.on('accountsChanged', function () {
    getWalletAddress();
  })



  return (
    <div>
      <div className='lpOuter'>
        <div className='lpInnerUpper d-flex justify-content-between'>
          <div className='lpInnerUpperLeft'>
            BLOCKVAULT
          </div>
          <div className='lpInnerUpperMiddle '>
            <ul className='d-flex'>
              <li>Home</li>
              <li>How it works</li>
              <li>About</li>
            </ul>
          </div>
          <div className='lpInnerUpperRight'>
            <button onClick={connectToMetaMask}>
              {walletAddress ? walletAddress.slice(0, 5) + "..." + walletAddress.slice(walletAddress.length - 3, walletAddress.length) : "Connect wallet"}
            </button>
          </div>
        </div>
        <div className='lpInnerBody d-flex my-4'>
          <div className='lpInnerBodyLeft'>
          </div>
          <div className='lpInnerBodyRight'>
            <div className='multipleColorPalette'>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className='punchLine my-4'>
              <h2>Store your docuemnts securely using Blockchain</h2>
            </div>
            <div className='lpDescription'>
              <p>Upload and retrive your documents securly using WEB3 technology</p>
            </div>
          </div>
        </div>
        <div className='lpInnerFooter'>
          {showSpinner && <button onClick={handleLandingPageSubmit}>
            <Spinner />
          </button>}
          {!showSpinner && <button onClick={handleLandingPageSubmit}>
            {walletAddress ? <div>Click here to continue</div> : <div><span className='mx-4'><i className="bi bi-wallet text-light"></i></span>
              Connect your wallet to continue</div>}
          </button>}
        </div>
      </div>
    </div>
  )
}
