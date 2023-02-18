import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import NFTContract from '../contracts/NFTContract.json';

const DisplayNFT = () => {
  const [nftData, setNFTData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setStatusMessage('Loading NFTs...');

      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.enable();
      const account = accounts[0];

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = NFTContract.networks[networkId];
      const contract = new web3.eth.Contract(NFTContract.abi, deployedNetwork.address);

      const nftIds = await contract.methods.getNFTIds().call();
      const nftData = await Promise.all(nftIds.map(async (nftId) => {
        const nftInfo = await contract.methods.getNFTInfo(nftId).call();
        return {
          id: nftId,
          name: nftInfo.name,
          description: nftInfo.description,
          image: nftInfo.image,
          owner: nftInfo.owner,
          forSale: nftInfo.forSale,
          price: web3.utils.fromWei(nftInfo.price, 'ether'),
        };
      }));

      setNFTData(nftData);
      setStatusMessage('');
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h2>My NFTs</h2>
      {loading ? <p>Loading NFTs...</p> :
      nftData.length === 0 ? <p>No NFTs found.</p> :
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Owner</th>
            <th>For Sale</th>
            <th>Price (ETH)</th>
          </tr>
        </thead>
        <tbody>
          {nftData.map((nft) => (
            <tr key={nft.id}>
              <td>{nft.id}</td>
              <td>{nft.name}</td>
              <td>{nft.description}</td>
              <td><img src={nft.image} alt={nft.name} /></td>
              <td>{nft.owner}</td>
              <td>{nft.forSale ? 'Yes' : 'No'}</td>
              <td>{nft.forSale ? nft.price : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>}
      <p>{statusMessage}</p>
    </div>
  );
};

export default DisplayNFT;
