import React,{useState,useEffect} from 'react'
import Web3 from 'web3';
import { useSelector,useDispatch } from 'react-redux'
import { RootState } from '../store'
import { lpActions } from '../store/landingPage';

export default function Landing() {

const walletConnected = useSelector((state:RootState)=>state.lp.walletConnected)
const [web3, setWeb3] = useState<Web3 | undefined>(undefined);
const [walletAddress, setWalletAddress] = useState<string|undefined>(undefined)
const dispatch = useDispatch();

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

  useEffect(() => {
    connectToMetaMask();
  }, [])

  useEffect(() => {
    dispatch(lpActions.connectWallet())
    const getWalletAddress = async () => {
        if (web3) {
          const accounts = await web3.eth.getAccounts();
          setWalletAddress(accounts[0]);
        }
      };
      getWalletAddress();
  }, [web3])
  
  

  return (
    <div>
        {console.log(walletConnected)!}
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
                        {walletAddress?walletAddress.slice(0,5)+"..."+walletAddress.slice(walletAddress.length-3,walletAddress.length): "Connect wallet"}
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
                <button>
                    <span className='mx-4'><i className="bi bi-wallet text-light"></i></span>
                    Connect your wallet to continue
                </button>
            </div>
        </div>
    </div>
  )
}
