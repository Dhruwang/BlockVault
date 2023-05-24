import React from 'react'

export default function Navigation() {
    return (
        <div>
            <div className='NavigationOuter'>
                <div>
                    <div className='NavigationUpper'>
                        <h1>BLOCKVAULT</h1>
                        <button className='modalBtn'><i className="bi bi-upload"></i> &nbsp;  Upload </button>
                    </div>
                    <div className='NavigationMiddle'>
                        <div className='NavLinks'>
                            <ul>
                                <li><a><i className="bi bi-house"></i> &nbsp; Home</a></li>
                                <li><a><i className="bi bi-check"></i> &nbsp;Verify</a></li>
                                <li><a><i className="bi bi-send"></i>&nbsp;  Send</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='NavigationLower'>
                    <div className='userdetails'>
                        <p>Hello,</p>
                        <h3>Username</h3>
                    </div>
                    <div>
                        <button className='modalBtn-inverted'>Logout</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
