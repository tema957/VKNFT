import React, { useState } from 'react';
import Web3 from 'web3';

const CreateNFT = () => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemImage, setItemImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleItemDescriptionChange = (e) => {
    setItemDescription(e.target.value);
  };

  const handleItemImageChange = (e) => {
    setItemImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('Creating NFT...');

    const web3 = new Web3(window.ethereum);
    const accounts = await window.ethereum.enable();
    const account = accounts[0];

    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('itemDescription', itemDescription);
    formData.append('itemImage', itemImage);

    try {
      const response = await fetch('/api/create-nft', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${account}`,
        },
      });
      const data = await response.json();
      if (data.error) {
        setStatusMessage(data.error);
      } else {
        setStatusMessage('NFT created successfully!');
      }
    } catch (error) {
      console.error(error);
      setStatusMessage('Error creating NFT. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create NFT</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="item-name">Item name:</label>
          <input type="text" id="item-name" value={itemName} onChange={handleItemNameChange} required />
        </div>
        <div>
          <label htmlFor="item-description">Item description:</label>
          <textarea id="item-description" value={itemDescription} onChange={handleItemDescriptionChange} required />
        </div>
        <div>
          <label htmlFor="item-image">Item image:</label>
          <input type="file" id="item-image" accept="image/*" onChange={handleItemImageChange} required />
        </div>
        <button type="submit" disabled={loading}>Create</button>
      </form>
      <p>{statusMessage}</p>
    </div>
  );
};

export default CreateNFT;
