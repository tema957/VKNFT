const Web3 = require("web3");
const web3 = new Web3();
const abi = require("./abi.json");

class Contract {
  constructor(contractAddress, privateKey) {
    this.contractAddress = contractAddress;
    this.privateKey = privateKey;
    this.web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/your-project-id"));
    this.contract = new this.web3.eth.Contract(abi, contractAddress);
  }

  async getNFTData(tokenId) {
    try {
      const nftData = await this.contract.methods.tokenURI(tokenId).call();
      return nftData;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async addNFTData(tokenId, nftData, nonce) {
    try {
      const data = this.contract.methods.setTokenURI(tokenId, nftData).encodeABI();
      const gasPrice = await this.web3.eth.getGasPrice();
      const gasLimit = 8000000;
      const tx = {
        nonce,
        gasPrice,
        gasLimit,
        to: this.contractAddress,
        data,
      };
      const signedTx = await this.web3.eth.accounts.signTransaction(tx, this.privateKey);
      const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      return receipt;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}

module.exports = Contract;

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