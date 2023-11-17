import { useCallback, useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")


const passwordGenerator = useCallback(() => {

  let pass = "";
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  if(numberAllowed) str += "0123456789"
  if(charAllowed) str += "!@#$%^&*-_+=[]{}~`"

  for(let i = 0; i < length; i++) {
    let index = Math.floor(Math.random() * (str.length + 1))

    pass += str.charAt(index)
  }

  // console.log(pass);
  setPassword(pass);

}, [length, numberAllowed, charAllowed, setPassword])

//useRef
const passwordRef = useRef(null)

const copyPasswordToClipboard = useCallback(() => {
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,100);
  window.navigator.clipboard.writeText(password)
}, [password])


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
            className='outline-none w-full px-3 py-2'
            placeholder='password'
            value={password}
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
       
          <input
            type='checkbox'
            id='numberInput'
            onChange={() => { 
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor='numberInput'>Numbers</label>

          <input
            type='checkbox'
            id='characterInput'
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}
          />
          <label htmlFor='characterInput'>Characters</label>


         </div>
        </div>
      
      </div>
    </>
  )
}

export default App
