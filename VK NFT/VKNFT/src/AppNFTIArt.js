import React, { useState } from 'react';

const NFTs = () => {
  const [nfts, setNfts] = useState([]);

  const fetchNfts = async () => {
    const response = await fetch('/api/nfts');
    const data = await response.json();
    setNfts(data);
  };

  useEffect(() => {
    fetchNfts();
  }, []);

  return (
    <div>
      <h1>NFTs</h1>
      {nfts.map((nft) => (
        <div key={nft.id}>
          <img src={nft.imageUrl} alt={nft.name} />
          <p>{nft.name}</p>
        </div>
      ))}
    </div>
  );
};

export default NFTs;