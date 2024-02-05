import React, { useCallback, useEffect, useRef, useState } from 'react'
import { TbRefresh } from "react-icons/tb";
import toast from 'react-hot-toast';

export default function PassGen({ setpasswordCopied }) {

    const [password, setPassword] = useState('');
    const [length, setLength] = useState(7);

    const [uppercase, setUppercase] = useState(false);
    const [lowercase, setLowercase] = useState(true);
    const [numbers, setNumbers] = useState(false);
    const [symbols, setSymbols] = useState(false);

    const passRef = useRef(null);

    const passGenarator = useCallback(() => {
        const chars = `${uppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : ''}${lowercase ? 'abcdefghijklmnopqrstuvwxyz' : ''}${numbers ? '0123456789' : ''}${symbols ? '!@#$%^&*()_+?><:{}[]' : ''}`;
        let passwordLength = length;
        let password = '';

        for (let i = 1; i <= passwordLength; i++) {
            let randomNumber = Math.floor(Math.random() * chars.length);            // It generate the random number. That num will be used to pick a character from the chars string.
            password += chars.substring(randomNumber, randomNumber + 1);            // += is used for appending the chars to the password string.   
        }                                                                           // (randomNumber, randomNumber + 1); It represent Starting or ending index of the substring.

        setPassword(password);

    }, [uppercase, lowercase, numbers, symbols, length]);


    useEffect(() => {
        passGenarator();
    }, [uppercase, lowercase, numbers, symbols, length]);

    function copybtnHandler() {
        if (passRef.current.value === '') {
            toast.error('Frist Create Password!');
            return;
        } else {
            passRef.current.select(); // select the password

            let maxCharacters = window.innerWidth <= 768 ? 17 : 30; // Set the maximum characters based on screen size
            passRef.current.setSelectionRange(0, maxCharacters); // for select specific range

            const selectedText = passRef.current.value.substring(0, maxCharacters); // Get the selected text
            window.navigator.clipboard.writeText(selectedText); // copy to clipboard

            savePassword(selectedText);
            setpasswordCopied((prev) => !prev);
            toast.success('Successfully Copied!');
        }
    }

    // Password Strength Checker
    function passwordStrength() {
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSymbol = /[!@#$%^&*()_+?><:{}[\]]/.test(password);

        if (password.length > 7 && hasLowercase && (hasUppercase || hasNumber) && hasSymbol) {
            return "./assets/Full.svg";
        } else if (password.length > 10 && hasLowercase && hasUppercase && hasNumber) {
            return "./assets/High.svg";
        } else if (password.length > 10 && hasLowercase || (hasNumber || hasUppercase)) {
            return "./assets/Medium.svg";
        } else if (password.length > 5 && hasLowercase) {
            return "./assets/Weak.svg";
        } else {
            return "./assets/None.svg";
        }
    }

    // Loacal Storage
    const [count, setCount] = useState(localStorage.length);

    function savePassword(selectedText) {
        localStorage.setItem(count, JSON.stringify(selectedText));
        setCount(count + 1);
    }


    return (
        <div className='w-full md:w-[40vw] p-2'>
            <div className='password-field flex flex-col'>
                <div className='flex items-center justify-between p-2 border-2 border-[#00f0ff] bg-[#00f0ff] text-cyan-300 bg-opacity-20'>
                    <input
                        className='outline-none w-full px-3 bg-[#00f0ff] text-cyan-300 text-lg bg-transparent'
                        type='text'
                        value={password}
                        ref={passRef}
                        readOnly
                    />
                    <div className='flex px-2 md:px-5'>
                        <img
                            src={`${passwordStrength()}`}
                            alt='Password Strength'
                            className='w-5 h-10 mx-3 md:mx-5'
                        />
                        <button className="p-2">
                            <TbRefresh onClick={passGenarator} className='cursor-pointer' size="1.5em" />
                        </button>
                    </div>
                </div>

                <div className='cursor-pointer w-full md:w-[17em] my-5'>
                    <img onClick={copybtnHandler} src="./assets/Button.svg" alt='Password Strength' loading='lazy' />
                </div>
            </div>

            <div className='passlength my-3 p-3'>
                <input
                    type='range'
                    className="cursor-pointer appearance-none bg-[#54f4ff] h-0.5 w-full outline-none transition-all duration-300 ease-in-out"
                    min='0s'
                    max='30'
                    value={length}
                    step='2'
                    onChange={(e) => setLength(e.target.value)}
                />
                <p className='text-cyan-300 text-sm font-semibold font-Overpass text-right my-3'>Password Length: {length}</p>
            </div>

            <div className='checks gap-5 font-Overpass flex flex-row justify-evenly'>
                <div className='flex flex-col p-3 gap-5 justify-around'>
                    <div className='flex gap-3 p-2 my-auto'>
                        <input type='checkbox' id='lowercase' defaultChecked={lowercase} onChange={() => setLowercase((prev) => !prev)} />
                        <label htmlFor='lowercase'>Lowercase</label>
                    </div>

                    <div className='flex gap-3 p-2 my-auto'>
                        <input type='checkbox' id='numbers' defaultChecked={numbers} onChange={() => setNumbers((prev) => !prev)} />
                        <label htmlFor='numbers'>Numbers</label>
                    </div>

                </div>

                <div className='flex flex-col p-3 gap-5 justify-around'>
                    <div className='flex gap-3 p-2 my-auto'>
                        <input type='checkbox' id='uppercase' defaultChecked={uppercase} onChange={() => setUppercase((prev) => !prev)} />
                        <label htmlFor='uppercase'>Uppercase</label>
                    </div>

                    <div className='flex gap-3 p-2 my-auto'>
                        <input type='checkbox' id='symbols' defaultChecked={symbols} onChange={() => setSymbols((prev) => !prev)} />
                        <label htmlFor='symbols'>Symbols</label>
                    </div>
                </div>
            </div>
        </div>



    )
}



