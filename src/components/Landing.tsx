import React from 'react'

export default function Landing() {
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
                    <button>
                        Connect wallet
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
                    Connect your wallet to continue
                </button>
            </div>
        </div>
    </div>
  )
}
