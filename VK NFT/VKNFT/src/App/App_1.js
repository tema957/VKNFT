import React, { useState, useEffect } from 'react';
import { View, Image, Text, Input, Button } from 'react-native';
import { ERC721, ERC721ABI, Web3 } from '..VKnftweb3/contract.js';

const App1 = () => {
const [contract, setContract] = useState(null);
const [balance, setBalance] = useState(0);
const [selectedTokenId, setSelectedTokenId] = useState(null);
const [name, setName] = useState('');
const [symbol, setSymbol] = useState('');
const [owner, setOwner] = useState(null);
const [loading, setLoading] = useState(false);
useEffect(() => {
	async function initializeContract() {
		const provider = new Web3.providers.HttpProvider('HTTP_PROVIDER_URL');
		const web3 = new Web3(provider);
		const contract = new web3.eth.Contract(ERC721ABI, 'CONTRACT_ADDRESS');
		const name = await contract.methods.name().call();
		const symbol = await contract.methods.symbol().call();
		const owner = await contract.methods.ownerOf(selectedTokenId).call();

		setContract(contract);
		setName(name);
		setSymbol(symbol);
		setOwner(owner);
	}
	initializeContract();
}, []);

const handleSubmit = async () => {
	setLoading(true);
	const balance = await contract.methods.balanceOf(owner).call();
	setBalance(balance);
	setLoading(false);
};

return (
	<View style={{ padding: 20 }}>
		<Text>Enter Token ID:</Text>
		<Input
			value={selectedTokenId}
			onChangeText={text => setSelectedTokenId(text)}
		/>
		<Button title="Submit" onPress={handleSubmit} />
		{loading ? <Text>Loading...</Text> : null}
		{balance ? (
			<View>
				<Text>Name: {name}</Text>
				<Text>Symbol: {symbol}</Text>
				<Text>Owner: {owner}</Text>
				<Text>Balance: {balance}</Text>
				<Image
					source={{ uri: `IMAGE_URI_FOR_TOKEN_ID_${selectedTokenId}` }}
					style={{ width: 100, height: 100 }}
				/>
			</View>
		) : null}
	</View>
    );
};

export default App1;