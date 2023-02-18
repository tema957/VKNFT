import React, { useState } from 'react';

const App3 = () => {
    const [selected, setSelected] = useState(null);

    const handleClick = (nft) => {
        setSelected(nft);
    };

    return (
        <div className="app-container">
            <h1>My NFT Collection</h1>
            <div className="nft-list">
                {nfts.map((nft) => (
                    <NFT
                        key={nft.id}
                        nft={nft}
                        onClick={() => handleClick(nft)}
                        selected={nft === selected}
                    />
                ))}
            </div>
            {selected ? <NFTDetails nft={selected} /> : <p>Select an NFT to view details</p>}
        </div>
    );
};

export default App3;