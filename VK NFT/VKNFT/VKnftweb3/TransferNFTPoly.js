import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNFTList, getNFT, transferNFT } from "./actions";

const TransferNFT = () => {
    const [recipient, setRecipient] = useState("");
    const selectedNFT = useSelector(state => state.selectedNFT);
    const dispatch = useDispatch();
  
    const handleSubmit = event => {
      event.preventDefault();
      dispatch(transferNFT(selectedNFT.id, recipient));
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h2>Transfer NFT</h2>
        <div>
          <label htmlFor="recipient">Recipient:</label>
          <input
            type="text"
            id="recipient"
            value={recipient}
            onChange={event => setRecipient(event.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  };
  
  export default TransferNFT;
  