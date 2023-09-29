import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  let [counter, setCounter] = useState(15);
  // let counter = 51;

  const addValue = () => {
    counter++;
    setCounter(counter);
    console.log(counter);
  }

  const removeValue = () => {
    if(counter > 0)
      counter--;

    setCounter(counter);
    console.log(counter);
  }

  return (
    <>
      <h1>Chai our React</h1>
      <h2>Counter Value: {counter}</h2>

      <button onClick={addValue}>Add Value {counter}</button>
      <br/> <br/>
      <button onClick={removeValue}>Remove Value {counter}</button>
    </>
  )
}

export default App
