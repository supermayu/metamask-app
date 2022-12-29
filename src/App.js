import './App.css';
import { useEffect,useState } from 'react';

const Wei = 1000000000000000000;

const Chains = {
  1:"Mainnet",
  3:"Ropsten",
  4:"Rinkeby",
  42:"Kovan",
  1337:"Geth private chain(default)",
  61:"Ethereum Classic Mainnet",
  62:"Morden",
  5:"Goerli"
}

const getAccount = async() => {
  try{
    const account = await window.ethereum.request({method:'eth_requestAccounts'});
    if(account.length > 0){
      return account[0];
    }else{
      return "";
    }
  }catch(err){
    if(err.code === 4001){
      console.log('Please connect to Metamask.');
    }else{
      console.log(err);
    }
    return "";
  }
}

const handleAccountChanged = async (accountNo, setAccount, setChainId) => {
  const account = await getAccount();
  setAccount(account);

  const chainId = await getChainId();
  setChainId(chainId);
}

const getChainId = async () => {
  const chainId = await window.ethereum.request({method:'eth_chainId'});
  return parseInt(chainId);
}

function App() {
  const [account,setAccount] = useState("-");
  const [chainId,setChainId] = useState(0);
  const btnDisabled = account != "-";

  const initializeAccount = async () => {
    //metamaskがインストールされているかの確認
    if(!window.ethereum || !window.ethereum.isMetaMask){
      alert('Metamaskをインストールしてください。')
      return
    }
    const account = getAccount();
    if(account != ""){
      handleAccountChanged(account,setAccount,setChainId);
    }
  };

  const logout = async () => {
    window.location.reload();
  }

  useEffect(() => {
    if(typeof window.ethereum !== 'undefined'){
      window.ethereum.on("accountsChanged", (accountNo) => handleAccountChanged(accountNo,setAccount,setChainId));
      window.ethereum.on("chainChanged", (accountNo) => handleAccountChanged(accountNo,setAccount,setChainId));
    }
  },[account]);

  return (
    <div>
      <h2>Metamask test</h2>
      <div>
        <h3>Account</h3>
        <button id="GetAccountButton" onClick={initializeAccount} disabled={btnDisabled}>Get Account</button>
        <p id="account">Address: {account}</p>
        <p id="account">Chain ID: {chainId}</p>
        <p id="account">Chain Name: {Chains[chainId]}</p>
        <button id="GetAccountButton" onClick={logout}>Log out</button>

      </div>
    </div>
  )
}

export default App;
