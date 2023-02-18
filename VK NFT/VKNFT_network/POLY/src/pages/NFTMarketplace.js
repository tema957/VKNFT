import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import MyNFT from "./contracts/MyNFT.json";
import MyToken from "./contracts/MyToken.json";

const NFTMarketplace = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNFTs();
  }, []);

  const loadNFTs = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // Load MyNFT contract
    const MyNFTContract = new ethers.Contract(
      MyNFT.networks[process.env.REACT_APP_NETWORK_ID].address,
      MyNFT.abi,
      signer
    );

    // Load MyToken contract
    const MyTokenContract = new ethers.Contract(
      MyToken.networks[process.env.REACT_APP_NETWORK_ID].address,
      MyToken.abi,
      signer
    );

    // Load all unsold NFTs
    const data = await MyNFTContract.queryFilter(
      MyNFTContract.filters.Transfer(null, "0x0000000000000000000000000000000000000000"),
      "latest"
    );

    const nfts = await Promise.all(
      data.map(async (d) => {
        const tokenURI = await MyNFTContract.tokenURI(d.args[2]);
        const balance = await MyTokenContract.balanceOf(d.args[1]);
        const meta = await fetch(tokenURI).then((res) => res.json());
        return {
          tokenId: d.args[2].toString(),
          seller: d.args[1],
          owner: d.args[1],
          image: meta.image,
          name: meta.name,
          description: meta.description,
          price: ethers.utils.formatUnits(meta.price.toString(), "ether"),
          balance: balance.toString(),
        };
      })
    );

    setNfts(nfts);
    setLoading(false);
  };

  const buyNFT = async (nft) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const MyNFTContract = new ethers.Contract(
      MyNFT.networks[process.env.REACT_APP_NETWORK_ID].address,
      MyNFT.abi,
      signer
    );

    const MyTokenContract = new ethers.Contract(
      MyToken.networks[process.env.REACT_APP_NETWORK_ID].address,
      MyToken.abi,
      signer
    );

    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await MyNFTContract.connect(signer).safeTransferFrom(nft.owner, signer.getAddress(), nft.tokenId);
    await transaction.wait();

    const balance = await MyTokenContract.balanceOf(signer.getAddress());

    if (balance.lt(price)) {
      const amount = price.sub(balance);
      const transaction = await MyTokenContract.connect(signer).mint(amount);
      await transaction.wait();
    }

    const transaction = await MyTokenContract.connect(signer).transfer(nft.owner, price);
    await transaction.wait();

    window.location.reload();
  };

  /*return (
    <div className="container">
      <div className="row mt-5">
        {loading ? (
          <p>Loading NFTs...</p>
        ) : nfts.length === 0 ? (
          <p>No NFTs for sale</p>
        ) : (
          nfts.map((nft
          */}