import './App.css';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import HardhatToken from './artifacts/contracts/HardhatToken.sol/HardhatToken.json';
import Interactions from './Interactions';
const HardhatTokenAddress = "0x5b4A823aF813014Ef41454FE1a92261461d7928e";

function App() {
  
  const [connection, setConnection] = useState("Connect Wallet");
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [tokenName, setTokenName] = useState(null);
  const [tokenSymbol, setTokenSymbol] = useState(null);
  const [tokenCA, setTokenCA] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const requestAccounts = async () => {
    await window.ethereum.request({method: "eth_requestAccounts"})
      .then(result => {
        accountChangeHandler(result[0]);
        setConnection("Wallet Connected");
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  const connectWallet = async () => {
    if (window.ethereum) {
      requestAccounts();
    } else {
      alert("Please install metamask!");
    }
  }

  const accountChangeHandler = async (address) => {
    setDefaultAccount(address);
    updateEthers();
  }

  const updateEthers = async () => {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner();
      let contract = new ethers.Contract(HardhatTokenAddress, HardhatToken.abi, signer);

      setProvider(provider);
      setSigner(signer);
      setContract(contract);
  }

  useEffect(() => {
    if (contract != null) {
      updateInfo();
    }
  },[contract]);

  const updateInfo = async () => {
    let tokenBalance = await contract.balanceOf(defaultAccount);
    setBalance(ethers.utils.formatEther(tokenBalance));
    setTokenName(await contract.name());
    setTokenSymbol(await contract.symbol());
    setTokenCA(HardhatTokenAddress);
  }

  return (
    <div className="App">
        <div className='container appContainer'>
          <div className='mb-3'>
            <h1>Hardhat Token</h1>
          </div>
          <div className='mb-3'>
            <button onClick={connectWallet} type="button" className="btn btn-warning btnConnect">{connection}</button>
          </div>

          <div className='mb-3'>
            <h3>Address: {defaultAccount}</h3>
            <h3>Token Balance: {balance}</h3>
          </div>

          <div className='mb-3 tokenInfo'>
            <h3>Name: {tokenName}</h3>
            <h3>Symbol: {tokenSymbol} </h3>
            <h3>Contract Address: {tokenCA} </h3>
          </div>

          <Interactions contract={contract} />
        </div>
        
    </div>
  );
}

export default App;
