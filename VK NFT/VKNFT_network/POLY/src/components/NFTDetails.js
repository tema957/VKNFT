import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getNFT } from "../services/nftService";

function NFTDetails() {
  const { id } = useParams();
  const [nft, setNFT] = useState(null);

  useEffect(() => {
    async function fetchNFT() {
      const nftData = await getNFT(id);
      setNFT(nftData);
    }
    fetchNFT();
  }, [id]);

  if (!nft) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{nft.name}</h2>
      <img src={nft.image} alt={nft.name} />
      <p>{nft.description}</p>
      <p>Owner: {nft.owner}</p>
      <p>Token ID: {nft.tokenId}</p>
    </div>
  );
}

export default NFTDetails;
