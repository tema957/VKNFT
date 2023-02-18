import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitColView, FormLayout, Input, FormLayoutGroup, Select, Button, Radio, PanelHeader } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { getNFT, getNFTList } from './nft';
import { getNetwork } from './web3';
import { tokensOfOwner } from './contract';
import nft_contract from './nft_contract';

const App = () => {
	const [scheme, setScheme] = useState('bright_light');
	const [activePanel, setActivePanel] = useState('home');
	const [network, setNetwork] = useState(null);
	const [nftList, setNFTList] = useState([]);
	const [selectedNFT, setSelectedNFT] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				setScheme(data.scheme)
			}
		});

		async function fetchData() {
			const networkId = await getNetwork();
			setNetwork(networkId);
			const nftIdList = await tokensOfOwner();
			if (nftIdList.length > 0) {
				const nftList = await getNFTList(nftIdList);
				setNFTList(nftList);
				const selectedNFT = await getNFT(nftList[0].id);
				setSelectedNFT(selectedNFT);
			}
			setPopout(null);
		}
		fetchData();
	}, []);
	const Home = ({ id, go, fetchedUser }) => (
		<Panel id={id}>
		<PanelHeader>Example</PanelHeader>
		{fetchedUser &&
		<Group title='User Data Fetched with VK Bridge'>
		<Cell
		before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
		description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
		>
		{${fetchedUser.first_name} ${fetchedUser.last_name}}
		</Cell>
		</Group>
		}
		<Group title='NFT Contract'>
		<List>
			<Cell button onClick={() => go('nft_contract')}>
				<InfoRow header='NFT Contract Address'>
					{nft_contract.options.address}
				</InfoRow>
			</Cell>
		</List>
	</Group>
</Panel>
);

export default Home;

const App2 = () => {
	const [scheme, setScheme] = useState('bright_light');
	const [activePanel, setActivePanel] = useState('home');
	const [selectedOption, setSelectedOption] = useState('name');
	const [inputValue, setInputValue] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [transactionHash, setTransactionHash] = useState('');
	const handleOptionChange = (event) => {
		setSelectedOption(event.currentTarget.value);
	};
	
	const handleInputChange = (event) => {
		setInputValue(event.currentTarget.value);
	};
	
	const handleImageUrlChange = (event) => {
		setImageUrl(event.currentTarget.value);
	};
	
	const handleSubmit = async (event) => {
		event.preventDefault();
		const { hash } = await nft.methods.createNFT(inputValue, imageUrl).send({
			from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
		});
		setTransactionHash(hash);
	};
	
	return (
		<ConfigProvider scheme={scheme}>
			<View activePanel={activePanel}>
				<PanelHeader>NFT Example</PanelHeader>
				<FormLayout>
					<FormLayoutGroup>
						<Radio name="searchBy" value="name" defaultChecked onChange={handleOptionChange}>
							Name
						</Radio>
						<Radio name="searchBy" value="id" onChange={handleOptionChange}>
							ID
						</Radio>
					</FormLayoutGroup>
					<Input type="text" onChange={handleInputChange} placeholder={`Enter ${selectedOption === 'name' ? 'Name' : 'ID'}`} />
					<Input type="text" onChange={handleImageUrlChange} placeholder="Enter Image URL" />
					<Button size="xl" onClick={handleSubmit}>Create NFT</Button>
					{transactionHash && <p>Transaction hash: {transactionHash}</p>}
				</FormLayout>
			</View>
		</ConfigProvider>
	);
}

export default App2;	

const App = () => {
	const [scheme, setScheme] = useState('bright_light');
	const [activePanel, setActivePanel] = useState('home');
	const [user, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	
	useEffect(() => {
	bridge.subscribe(({ detail: { type, data }}) => {
	if (type === 'VKWebAppUpdateConfig') {
	setScheme(data.scheme);
	}
	});
	async function fetchData() {
	try {
	const user = await bridge.send('VKWebAppGetUserInfo');
	setUser(user);
	setPopout(null);
	} catch (e) {
	console.error(e);
	}
	}
	fetchData();
	}, []);
	
	const go = e => {
	setActivePanel(e.currentTarget.dataset.to);
	};
	
	return (
	<ConfigProvider scheme={scheme}>
	<AdaptivityProvider>
	<AppRoot>
	<SplitLayout popout={popout}>
	<SplitCol>
	<View activePanel={activePanel}>
	<Home id='home' user={user} go={go} />
	<Persik id='persik' go={go} />
	</View>
	</SplitCol>
	</SplitLayout>
	</AppRoot>
	</AdaptivityProvider>
	</ConfigProvider>
	);
	};
	
	export default App;