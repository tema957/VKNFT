import React, { useState, useEffect } from 'react';
import { View, ScreenSpinner } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { getTokenData, getOwner, transferToken } from '../../VKnftweb3/contract';


const App = () =>{
	const [loading, setLoading] = useState(true);
	const [tokenData, setTokenData] = useState(null);
	const [owner, setOwner] = useState(null);

	useEffect(() => {
		async function fetchData() {
			const token = await getTokenData();
			setTokenData(token);
			const tokenOwner = await getOwner();
			setOwner(tokenOwner);
			setLoading(false);
		}
		fetchData();
	}, []);
		
	if (loading) {
		return <ScreenSpinner size='large' />;
	}

	return (<View> {/* Display token data */}
		{tokenData && <div>{tokenData.name}</div>}
		{owner && <div>{owner.name}</div>}
	</View>);
};

export default App;