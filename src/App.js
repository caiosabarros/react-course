import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react'

function App() {

  const [counter, setCounter] = useState(0);

  /* 
  This is a functional simulation of a class component lifecycle.
  */

  /*
  This useEffect below simulates a componentDidMount because of no-depedency.
  It will run only once after the App() component is rendered.
  */
  useEffect(()=>{
    setCounter(counter+1);
    return ()=>{
      setCounter(10);
    }
  },[])

  const handleClick = () => {
    setCounter(counter+1);
  }

  /*
  This simulates a componentDidUpdate: there was an state update in the counter state.
  So, this function will render, then also the App() component to load the new value of
  counter on the screen.
  */
  useEffect(()=>{
    console.log("updated");
  },[counter])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <h1>{counter}</h1>
        {/*It is important to notice that when I click, I will call the function.
        Passsing handleClick() would mean that I would run the result of the function 
        when I click it. It the function returns a callback, then that may be 
        interesting.*/}
        <h1 onClick={handleClick}>Increment</h1>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
