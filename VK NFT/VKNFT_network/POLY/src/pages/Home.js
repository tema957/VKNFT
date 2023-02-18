import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";
import NFTList from "./NFTList";

const Home = () => {
  const { isAuthenticated, Moralis } = useMoralis();
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      const PolygonMainnetNFTs = await Moralis.Web3API.account.getNFTs({
        chain: "polygon",
      });
      setNfts(PolygonMainnetNFTs.result);
    };
    if (isAuthenticated) {
      fetchNFTs();
    }
  }, [isAuthenticated]);

  return (
    <div>
      {isAuthenticated ? (
        <NFTList nfts={nfts} />
      ) : (
        <div>
          <p>Please sign in to view your NFTs</p>
          <Link to="/login">Sign in</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
