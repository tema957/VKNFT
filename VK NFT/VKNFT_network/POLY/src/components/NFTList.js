import React from 'react';
import NFTCard from './NFTCard';

const NFTList = ({ nfts }) => {
  return (
    <div className="nft-list">
      {nfts.map((nft) => (
        <NFTCard key={nft.id} nft={nft} />
      ))}
    </div>
  );
};

export default NFTList;
