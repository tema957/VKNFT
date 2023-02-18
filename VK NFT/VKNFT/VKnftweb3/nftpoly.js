import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNFTList, getNFT, transferNFT } from "./actions";
import Web3 from "web3";
import { Contract, Wallet } from "@polygon/embedded";

const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon.infura.io/v3/<YOUR_PROJECT_ID>"));

async function connectToPolygon() {
  try {
    const networkId = await web3.eth.net.getId();
    console.log(`Connected to Polygon network with ID: ${networkId}`);
  } catch (error) {
    console.error(`Error connecting to Polygon: ${error}`);
  }
}

async function createNFT(contractAddress, wallet) {
  const contract = new Contract(web3.currentProvider, contractAddress);

  try {
    const result = await contract.methods
        contract.methods
            .createNFT("My NFT", "https://example.com/nft")
            .send({ from: wallet.address });

    console.log(`NFT created with transaction ID: ${result.transactionHash}`);
  } catch (error) {
    console.error(`Error creating NFT: ${error}`);
  }
}

async function sellNFT(contractAddress, wallet, nftId, price) {
  const contract = new Contract(web3.currentProvider, contractAddress);

  try {
    const result = await contract.methods
      .transferFrom(wallet.address, buyerAddress, nftId)
      .send({ from: wallet.address, value: web3.utils.toWei(price, "ether") });

    console.log(`NFT sold with transaction ID: ${result.transactionHash}`);
  } catch (error) {
    console.error(`Error selling NFT: ${error}`);
  }
}

connectToPolygon();

const wallet = Wallet.createRandom();
createNFT("<CONTRACT_ADDRESS>", wallet, "<NFT_NAME>", "<NFT_URI>");
sellNFT("<CONTRACT_ADDRESS>", wallet, "<BUYER_ADDRESS>", "<NFT_ID>", "<PRICE>");

const NFTList = () => {
  const [selectedNFT, setSelectedNFT] = useState(null);
  const dispatch = useDispatch();
  const nftList = useSelector(state => state.nftList);

  useEffect(() => {
    dispatch(getNFTList());
  }, [dispatch]);

  const handleNFTSelection = id => {
    setSelectedNFT(id);
    dispatch(getNFT(id));
  };

  return (
    <div>
      <h2>NFT List</h2>
      <ul>
        {nftList.map(nft => (
          <li key={nft.id} onClick={() => handleNFTSelection(nft.id)}>
            {nft.name}
          </li>
        ))}
      </ul>
      {selectedNFT && (
        <div>
          <h2>Selected NFT</h2>
          <p>ID: {selectedNFT}</p>
        </div>
      )}
    </div>
  );
};

export default NFTList;

