import React from 'react'
import PassGen from '../components/PassGen'
import PassHistory from '../components/PassHistory'

export default function Home() {
  return (
    <div>
      <div className="max-w-7xl h-screen border-2 border-white mx-auto p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">

      <h1 className='text-yellow-300'>Password Generator</h1>
            <p className='text-white'>Generate a secure passwords</p>

        <div className='border-2 p-2 flex justify-around'>
          <section className='left'>
            <PassGen />
          </section>

          <section className='right'>
            <PassHistory />
          </section>
        </div>
      </div>
    </div>
  )
}
