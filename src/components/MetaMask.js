import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function MetaMask() {

  // Use state to track:
  // if a user's browser has the MetaMask plugin installed, and 
  // the user's wallet, once connected through MetaMask
  // if the fetch request has been sent to OpenSea
  // the nfts belonging to either of the two desired collections
  const [plugin, setPlugin] = useState("");
  const [wallet, setWallet] = useState("");
  const [query, setQuery] = useState(false);
  const [buildspace, setBuildspace] = useState([]);
  const [learnweb3, setLearnweb3] = useState([]);
  const [displayWallet, setDisplayWallet] = useState("");

  useEffect(() => {
    togglePlugin();
    retrieveOpensea();
    truncateAddress(wallet);
  }, [wallet]);

  // Used to detect if the MetaMask global API, located at window.ethereum, is present
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
    setQuery(false);
    setBuildspace([]);
    setLearnweb3([]);
  }

  async function retrieveOpensea() {
    if (wallet === "") { return }
    fetch(`https://api.opensea.io/api/v1/assets?owner=${wallet}&order_direction=desc&limit=20&include_orders=false`)
      .then((res) => res.json())
      .then((res) => {
        res.assets.map((nft) => nft.asset_contract.address === "0x3CD266509D127d0Eac42f4474F57D0526804b44e" ? buildspace.push(nft) : null)
        res.assets.map((nft) => nft.asset_contract.address === "0x1Ed25648382c2e6Da067313e5DAcb4F138Bc8b33" ? learnweb3.push(nft) : null)
        setQuery(true);
      })
      .catch((e) => {
        console.error(e)
        console.error('Could not connect to OpenSea')
      })
  }

  function truncateAddress(address) {
    if (!address) {
      return "";
    }
    setDisplayWallet(`${address.substr(0, 5)}...${address.substr(address.length - 5, address.length)}`);
  }

  return (
    <>
      <div className='header-container'>
        {
          plugin === "present" && wallet === "" ? 
            <Button id="metamask-login" onClick={metamaskLogin} variant="contained">
              Login with MetaMask
            </Button>
          : wallet !== "" ?
            <Button onClick={metamaskLogout} variant="outlined">
              Logout of MetaMask
            </Button>
          : 
            <Button id="metamask-login" variant="contained" disabled>
              MetaMask is not installed
            </Button>
        }
        {
          wallet !== "" ?
            <div className="display-wallet">
              <Typography>Your Wallet:</Typography>
              <Typography sx={{margin: "0 0 0 10px"}}>{displayWallet}</Typography>
            </div>
          :
            <p>login to connect your wallet ☝️</p>
        }
      </div>
      <div className="collection-container">
        <Typography sx={{fontSize: "20px", margin: "5px 0 0 15px"}}>LearnWeb3 NFTs</Typography>
        {
          learnweb3.length ?
            <div className="nft-wrapper">
              {
                learnweb3.map((nft) => (
                    <div className="nft-tile" key={nft.id}>
                      <img className="nft-img" src={nft.image_url} alt="" />
                    </div>
                ))
              }
            </div>
          : query === true ?
            <Typography sx={{alignSelf: "center"}}>You do not have any  NFTs from this collection</Typography>
          :
          <Typography sx={{alignSelf: "center"}}>please connect your wallet</Typography>
        }
      </div>
      <div className="collection-container">
      <Typography sx={{fontSize: "20px", margin: "5px 0 0 15px"}}>Buildspace NFTs</Typography>        
        {
          buildspace.length ?
            <div className="nft-wrapper">
              {
                buildspace.map((nft) => (
                    <div className="nft-tile" key={nft.id}>
                      <img className="nft-img" src={nft.image_url} alt="" />
                    </div>
                ))
              }
            </div>
          : query === true ?
            <Typography sx={{alignSelf: "center"}}>You do not have any  NFTs from this collection</Typography>
          :
            <Typography sx={{alignSelf: "center"}}>please connect your wallet</Typography>        
        }
      </div>
    </>
  );
}

export default MetaMask;
