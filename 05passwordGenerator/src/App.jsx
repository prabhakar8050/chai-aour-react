import { Input } from 'postcss';
import { useCallback, useEffect, useRef, useState } from 'react'
 

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState();

  //useRef Hook
  const passwordRef = useRef(null);

  // Ye function ko memorise karta hai either pura function ya jo part reuse ho raha ho bas wo
  // yaha hum dependencies esliye de rahe hai so that jo bhi methods run ho rahe hai wo optimised rahe
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for(let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);

    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword]);
  
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password);
  }, [password])

  


  // passwordGenerator();


// We could have also directely make the passwordGenerator, So that whenever useEffect runs it's been called.
// But instead we prefer using useCallback to optimise and use cache
  // function passwordGenerator() {
  //   let pass = "";
  //   let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
  //   if (numberAllowed) str += "0123456789";
  //   if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

  //   for(let i = 1; i <= length; i++) {
  //     let char = Math.floor(Math.random() * str.length + 1);
  //     pass += str.charAt(char);

  //   }

  //   setPassword(pass);
  // }


  // Yaha pe koi bhi chher chhar huaa to dubara run kar do function ko
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <>
      <div className='text-center w-full max-w-md mx-auto shadow-md rounded-lg px-6 py-6 my-8 mx-8 text-orange-500 bg-gray-700'>

        <h1 className='text-white text-center my-4'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
          type='text'
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
          />

          <button 
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>

        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type='range'
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
          <input 
            type='checkbox'
           defaultChecked={numberAllowed}
           id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev) }}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
          <input 
            type='checkbox'
           defaultChecked={charAllowed}
           id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev) }}
            />
            <label htmlFor='numberInput'>Characters</label>
          </div>

        </div>

      </div>
    </>
  )
}

export default App
