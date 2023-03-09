import './App.css';
import { useState } from 'react';
import { ethers } from "ethers";


function App() {
  const [account, setAccount] = useState("");
  const [data, setData] = useState([]);

  console.log(data);
  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    let res = await provider.send("eth_requestAccounts", []);
    setAccount(res[0]);
    getData(res[0]);
  };


  const getData = () => {
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    fetch(
      'https://api.opensea.io/api/v1/assets?owner=0x943590A42C27D08e3744202c4Ae5eD55c2dE240D&order_direction=desc&limit=200&include_orders=false',
      options
    )
      .then(response => response.json())
      .then(response => {
        setData(response.assets);
        console.log(response);
      })
      .catch(err => console.error(err));
  }


  return (
    <div className="App">
      <p className="wallet">Wallet ID: {account}</p>
      <button className="connect" onClick={connect}>Connect</button>
      <div className="container">
        {data.map(nft => {
          return (
            <div className="nft-cards">
              <div className="images">
                <img className="nft-image" src={nft.image_thumbnail_url} alt="nft" />
                <div className="layer">
                  <h3>{nft.name}</h3>
                  <p>Creator Address: </p>
                  <a href={nft.creator.address}>{nft.creator.address}</a>
                  <p>{nft.description}</p>
                  <a href={nft.permalink}><button>Buy NFT</button></a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default App;
