import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react'
import axios from 'axios'

/*
Data fetching with Axios in React
*/

const ETHERSCAN_KEY = "EFZNVDXNIMCDXUPYVT2IY9EXEXGCANDCX5"
const UKRAINIAN_ADDRESS = "0x165CD37b4C644C2921454429E7F9358d18A45e14"

function App() {

  const [balance, setBalance] = useState("");
  const [transactions, setTransactions] = useState([]);

  async function getAddressBalance(_address){
    try {
      const {data} = await axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${_address}&tag=latest&apikey=${ETHERSCAN_KEY}`);
      console.log(data);
      setBalance(data.result);
    } catch(error){
      console.log(error.message);
    }
  }

  const getTransactionsList = async (_address, _quantity) => {
    try {
      const {data} = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${_address}&startblock=0&endblock=99999999&page=1&offset=${_quantity}&sort=asc&apikey=${ETHERSCAN_KEY}`);
      console.log(data);
      //await Promise.all(data);
      setTransactions(data.result);
      console.log(transactions);
    } catch(error){
      console.log(error.message);
    }
  }

  useEffect(()=>{
    getTransactionsList(UKRAINIAN_ADDRESS, 10)
    getAddressBalance(UKRAINIAN_ADDRESS);
    return ()=>{
    }
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button
        >
          See Transactions
        </button>

        <h1>Ukranian Balance on Ethereum Mainnet</h1>
        <h3>{(parseFloat(balance)/10**18).toFixed(3)} ETH</h3>
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
      </header>
    </div>
  );
}

export default App;
