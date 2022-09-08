import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

function App() {

  // Use state to track:
  // if a user's browser has the MetaMask plugin installed, and 
  // the user's wallet, once connected through MetaMask
  const [plugin, setPlugin] = useState("");
  const [wallet, setWallet] = useState("");

  const [nfts, setNfts] = useState([]);

  // We want to detect if the user has MetaMask installed every time this component loads
  useEffect(() => {
    togglePlugin();
  }, []);

  // Used to detect the MetaMask global API, located at window.ethereum, if present
  function togglePlugin() {
    if (typeof window.ethereum !== "undefined") {
      setPlugin("present");
      console.log("Metamask is installed!");
    } else {
      setPlugin("absent");
      console.log("Metamask is not installed...");
    };
  };

  // Connect to a user's metamask account
  async function metamaskLogin() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      // We want to capture the message if user doesn't select a wallet
      .catch((e) => {
        console.error(e.message)
      })
    if (!accounts) { return }
    setWallet(accounts[0]);
  };

  function metamaskLogout() {
    setWallet("");
  }

  async function retrieveOpensea() {
    if (wallet === "") { return }
    fetch(`https://api.opensea.io/api/v1/assets?owner=${wallet}&order_direction=desc&limit=20&include_orders=false`)
      .then((res) => res.json())
      .then((res) => {
        setNfts(res.assets) 
      })
      .catch((e) => {
        console.error(e)
        console.error('Could not connect to OpenSea')
      })
  }

  return (
    <div className="app">
      <div>
        {
          plugin === "present" && wallet === "" ? 
            <Button id="metamask-login" onClick={metamaskLogin} >
              Login with MetaMask
            </Button>
          : wallet !== "" ?
            <Button onClick={metamaskLogout}>
              Logout of MetaMask
            </Button>
          : 
            <Button id="metamask-login" disabled>
              Metamask is not installed
            </Button>
        }
      </div>
      <div>
        {
          wallet !== "" ?
            <p>{wallet}</p>
          :
            <p>login to connect your wallet ☝️</p>
        }
      </div>
      <div>
        {
          wallet !== "" ?
            <Button onClick={retrieveOpensea}>
              Retrieve NFTs
            </Button>
          :
            <></>
        } 
      </div>
      <div>
        {
          
        }
      </div>
    </div>
  );
}

export default App;
