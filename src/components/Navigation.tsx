
import { useEffect, useState } from 'react'
import ConfirmModal from './ConfirmModal'
import { Link, useNavigate,useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { lpActions } from '../store/landingPage'

export default function Navigation() {

    const [username, setusername] = useState<string | null>(null)
    const [showModal, setshowModal] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const location = useLocation();
  
    useEffect(() => {
        setusername(sessionStorage.getItem('username'))
    }, [])

    const handleLogout=()=>{
        setshowModal(true)
    }
    const dismissModal=()=>{
        setshowModal(false)
        
    }

    const confirmLogout=()=>{
        sessionStorage.removeItem('username')
        sessionStorage.removeItem("token")
        navigate("/")
    }
    
            

    return (
        <div>
            {showModal && <ConfirmModal message='Are you sure you want to logout ?' onCancel={dismissModal} onConfirm={confirmLogout}/>}
            <div className='NavigationOuter'>
                <div className='NavigationMain'>
                    <div className='NavigationUpper'>
                        <h1>BLOCKVAULT</h1>

                    </div>
                    <div className='NavigationMiddle'>
                        <div className='NavLinks'>
                            <ul>
                                <li className={location.pathname==="/home"?`selectedTab`:""}>
                                    <Link to="/home">
                                        <i className="bi bi-house"></i> &nbsp; Home
                                    </Link>
                                </li>
                                <li className={location.pathname==="/verify"?`selectedTab`:""} ><Link to="/verify"><i className="bi bi-file-break"></i> &nbsp;Verify</Link></li>
                                <li className={location.pathname==="/send"?`selectedTab`:""}><Link to="/send"><i className="bi bi-send"></i>&nbsp;  Send</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='NavigationLower'>
                    <div className='userdetails'>
                        <p>Hello,</p>
                        <h3>{username ? username : "username NA"}</h3>
                    </div>
                    <div>
                        <button className='modalBtn-inverted' onClick={handleLogout}><i className="bi bi-box-arrow-right"></i> Logout</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
