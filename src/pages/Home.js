import React, { useState } from 'react'
import PassGen from '../components/PassGen'
import PassHistory from '../components/PassHistory'

export default function Home() {

  const [passwordCopied, setpasswordCopied] = useState(false);


  return (
    <div>
      <div className="max-w-7xl h-screen mx-auto p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">

        <div className='my-5'>
          <h1 className='text-5xl font-bold text-[#F8Ef00] font-Overpass uppercase'>Password Generator</h1>
          <p className='text-2xl font-mono font-semibold text-white'>Generate a Secure Passwords</p>
        </div>

        <div className='p-2 flex flex-col md:flex-row justify-between'>
          <div className='left mb-4 md:mb-0'>
            <PassGen setpasswordCopied={setpasswordCopied} />
          </div>

          <div className='right'>
            <PassHistory passwordCopied={passwordCopied} />
          </div>
        </div>
      </div>
    </div>
  )
}
