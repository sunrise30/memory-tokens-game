import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import './App.css';
import Navbar from './Navbar';
import MemoryToken from '../abis/MemoryToken.json';
import CardArray from '../constants/CardArray.json';
import CardBoard from './CardBoard';

function App() {
  const [account, setAccount] = useState('0x0');
  const [token, setToken] = useState(null);
  const [totalSupply, setTotalSupply] = useState(0);
  const [tokenURIs, setTokenURIs] = useState([]);
  const [cardArray, setCardArray] = useState([]);
  const [cardsChosen, setCardsChosen] = useState([]);
  const [cardsChosenId, setCardsChosenId] = useState([]);
  const [cardsWon, setCardsWon] = useState([]);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying Metamask!');
    }
  }

  const loadAccount = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  }

  const loadBlockchainData = async () => {
    // Load smart contract
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkData = MemoryToken.networks[networkId];
    if (networkData) {
      const abi = MemoryToken.abi;
      const address = networkData.address;
      const token = new web3.eth.Contract(abi, address);
      setToken(token);
      const totalSupply = await token.methods.totalSupply().call();
      setTotalSupply(totalSupply);

      // Load tokens
      const balanceOf = await token.methods.balanceOf(account).call();
      for (let i = 0; i < balanceOf; i++) {
        const id = await token.methods.tokenOfOwnerByIndex(account, i).call();
        const tokenURI = await token.methods.tokenURI(id).call();
        setTokenURIs([...tokenURIs, tokenURI]);
      }
    } else {
      alert('Smart contract not deployed to detected network.');
    }
  }

  useEffect(() => {
    const load = async () => {
      await loadWeb3();
      await loadAccount();
    }
    load();
  }, []);

  useEffect(() => {
    const load = async () => {
      await loadBlockchainData();
      setCardArray(CardArray.sort(() => 0.5 - Math.random()));
    }
    if (account !== '0x0') {
      load();
    }
  }, [account]);

  return (
    <div>
      <Navbar account={account} />

      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content ms-auto me-auto">
              <h1 className="d-4">Start matching now!</h1>
              <CardBoard
                cardArray={cardArray}
                cardsWon={cardsWon}
                cardsChosenId={cardsChosenId}
                onClickCard={() => {}}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
