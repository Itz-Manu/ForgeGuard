import React, { useEffect, useState } from 'react'

export default function PassGen() {

    const [password, setPassword] = useState('*&^%$#@!');
    const [copyText, setCopyText] = useState('');

    function RanomPassword() {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+?><:{}[]';
        let passwordLength = 15;
        let password = '';

        for (let i = 0; i < passwordLength; i++) {
            let randomNumber = Math.floor(Math.random() * chars.length);            // It generate the random number. That num will be used to pick a character from the chars string.
            password += chars.substring(randomNumber, randomNumber + 1);            // += is used for appending the chars to the password string.   
        }                                                                           // (randomNumber, randomNumber + 1); It represent Starting or ending index of the substring.
        return password;
    }

    useEffect(() => {
        setPassword(RanomPassword());
    }, []);

    function copybtnHandler(){
        setCopyText(password);
    }

    console.log(copyText);

    return (
        <div>
            <div>
                <div className='password-field flex flex-col'>
                    <input className='outline-none text-black p-3' type='text' value={password} readOnly/>
                    <button onClick={copybtnHandler} className='bg-yellow-500 text-black m-5'>Copy</button>
                </div>

                <div className='passlength'>
                    <input className=' cursor-pointer' type='range' min='8' max='30' value='15' step='2' />
                </div>

                <div className='checks gap-5'>

                    <div className='flex gap-5 justify-around'>
                        <div>
                            <input type='checkbox' id='uppercase' />
                            <label htmlFor='uppercase'>Uppercase</label>
                        </div>

                        <div>
                            <input type='checkbox' id='lowercase' />
                            <label htmlFor='lowercase'>Lowercase</label>
                        </div>
                    </div>

                    <div className='flex gap-5 justify-around '>
                        <div>
                            <input type='checkbox' id='numbers' />
                            <label htmlFor='numbers'>Numbers</label>
                        </div>

                        <div>
                            <input type='checkbox' id='symbols' />
                            <label htmlFor='symbols'>Symbols</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
