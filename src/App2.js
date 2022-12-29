import './App.css';
import { useEffect,useState } from 'react';

const ethereumButton = document.querySelector('.enableEthereumButton');
const sendEthButton = document.querySelector('.sendEthButton');

let accounts = [];

const getAccount = async() => {
    accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
}

const sendEth = async () => {
    window.ethereum.request({
        method:'eth_sendTransaction',
        params:[
            {
                from: accounts[0],
                to: '0x9d3495a4c90fcdDE140A1f6115f4dd34Dcb65aD5',
                value: '0x09184e72a000',
                gas: '0x2710'
            }
        ]
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);
}

const isConnected = async() => {
    return window.ethereum.isConnected();
}


function App2() {

  return (
    <div>
      <h2>Metamask testtest</h2>
      <div>
        <h3>Account</h3>
        <button onClick={getAccount}>Enable Ethereum</button>
        <button onClick={sendEth}>SendEth</button>
        <p>isConnected: {getAccount}</p>
      </div>
    </div>
  )
}

export default App2;
