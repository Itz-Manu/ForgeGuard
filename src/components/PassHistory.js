import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { IoCopySharp } from "react-icons/io5";


export default function PassHistory({ passwordCopied }) {

  const [savedPassword, setSavedPassword] = useState('');      // get all the keys from local storage

  // Render Password History
  const handleUpdate = () => {
    setSavedPassword(Object.keys(localStorage));
  };

  useEffect(() => {
    handleUpdate();
  }, [passwordCopied]);


  // Delete History
  function deleteHistory() {
    setSavedPassword([]);
    localStorage.clear();
  }

  // copy the past password
  function handleCopybtn(index) {
    window.navigator.clipboard.writeText(localStorage.getItem(savedPassword[index]).replace(/["']/g, ''));
    toast.success('Successfully Copied!')
  }

  return (
    <div className='w-full lg:w-[35vw] h-full p-5'>
      <div>
        <h3 className='font-Overpass text-xl text-center my-5'>Password History</h3>

        <div className='px-5'>
          {savedPassword.length === 0 ? (
            <h3 className='font-Overpass text-sm text-slate-300 text-center'>
              No Password Saved
            </h3>
          ) : (
            <div className='h-[40vh] overflow-hidden'>
              {savedPassword.slice(0, 6).map((password, index) => (
                <div key={index} className='flex justify-between items-center px-5 lg:px-10'>
                  <h3 className='font-Overpass text-sm text-slate-300'>
                    {localStorage.getItem(password).replace(/["']/g, '')}
                  </h3>
                  <div
                    className='cursor-pointer hover:bg-slate-800 p-2 rounded-full'
                    onClick={() => handleCopybtn(index)}
                  >
                    <IoCopySharp />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className='history text-center my-5'>
            <button
              onClick={deleteHistory}
              className='font-Overpass text-sm text-[#F8Ef00]'
            >
              Clear History
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}
