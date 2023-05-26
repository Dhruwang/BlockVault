import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useEffect, useState } from 'react'

export default function Navigation() {

    const [username, setusername] = useState<string|null>(null)
    useEffect(() => {
      setusername(sessionStorage.getItem('username'))
    }, [])
    
    return (
        <div>
            <div className='NavigationOuter'>
                <div className='NavigationMain'>
                    <div className='NavigationUpper'>
                        <h1>BLOCKVAULT</h1>
                       
                    </div>
                    <div className='NavigationMiddle'>
                        <div className='NavLinks'>
                            <ul>
                                <li className='selectedTab'><a><i className="bi bi-house"></i> &nbsp; Home</a></li>
                                <li><a><i className="bi bi-check"></i> &nbsp;Verify</a></li>
                                <li><a><i className="bi bi-send"></i>&nbsp;  Send</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='NavigationLower'>
                    <div className='userdetails'>
                        <p>Hello,</p>
                        <h3>{username?username:"username NA"}</h3>
                    </div>
                    <div>
                        <button className='modalBtn-inverted'><i className="bi bi-box-arrow-right"></i> Logout</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
