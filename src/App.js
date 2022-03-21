import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DisplayEthSupply } from './components/DisplayEthSupply';

/*
Organizing Code Into Separated Components: 
Created the DisplayEthSupply Component.
*/

const ETHERSCAN_KEY = "EFZNVDXNIMCDXUPYVT2IY9EXEXGCANDCX5"
const UKRAINIAN_ADDRESS = "0x165CD37b4C644C2921454429E7F9358d18A45e14"

function App() {

  const [balance, setBalance] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [address, setAddress] = useState("")
  const [supply, setSupply] = useState("")


  async function getAddressBalance(_address) {
    try {
      const { data } = await axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${_address}&tag=latest&apikey=${ETHERSCAN_KEY}`);
      console.log(data);
      setBalance(data.result);
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleChange = (e) => {
    setAddress(e.target.value);
    if (address.length == 42) {
      getAddressBalance(address);
      console.log(address);
    } 
  }

  const getTotalEthSupply = async () => {
      const {data} = await axios.get(`https://api.etherscan.io/api?module=stats&action=ethsupply2&apikey=${ETHERSCAN_KEY}`)
      console.log(data.result.EthSupply);
      setSupply(data.result.EthSupply);
      alert(`The total supply of ETH is: ${supply}`);
    }
  

  const handleSubmit = (event) => {
    console.log('handSubmit')
    console.log(event)
    getTotalEthSupply();
    event.preventDefault();  
    }
  
    useEffect(() => {
    getAddressBalance(address);
    return () => {
    }
  }, [address])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button
        >
          See Transactions
        </button>
        <input value={address} onChange={handleChange} type="text"></input>

        <h1>Ukranian Balance on Ethereum Mainnet</h1>
        <h3>{(parseFloat(balance) / 10 ** 18).toFixed(3)} ETH</h3>
        {/*It is important to notice that when I click, I will call the function.
        Passsing handleClick() would mean that I would run the result of the function 
        when I click it. It the function returns a callback, then that may be 
        interesting.*/}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <DisplayEthSupply handleSubmit={handleSubmit}/>
      </header>
    </div>
  );
}

export default App;
