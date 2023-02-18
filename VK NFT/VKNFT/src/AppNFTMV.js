import React from 'react';
import { VKMiniApp } from '@vkontakte/vk-mini-app';
import { View, Text, Image, Video } from 'react-native';

const NFTs1 = ({ nfts }) => {
  return (
    <View>
      {nfts.map(nft => (
        <View key={nft.id}>
          {nft.type === 'audio' && (
            <View>
              <Text>{nft.title}</Text>
              <Image source={{ uri: nft.image }} />
              <Video source={{ uri: nft.audio }} />
            </View>
          )}

          {nft.type === 'video' && (
            <View>
              <Text>{nft.title}</Text>
              <Image source={{ uri: nft.image }} />
              <Video source={{ uri: nft.video }} />
            </View>
          )}
        </View>
      ))}
    </View>
  );
};
export default NFTs1;

class NFTs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nfts: [],
      loading: true,
    };
  }

  componentDidMount() {
    VKMiniApp.send('VKWebAppGetNFTs', {});

    VKMiniApp.subscribe((e) => {
      if (e.detail.type === 'VKWebAppGetNFTsResult') {
        this.setState({ nfts: e.detail.data, loading: false });
      }
    });
  }

  render() {
    const { nfts, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h2>Available NFTs</h2>
        <ul>
          {nfts.map((nft) => (
            <li key={nft.id}>{nft.title}</li>
          ))}
        </ul>

        <button onClick={() => VKMiniApp.send('VKWebAppBuyNFT', {})}>Buy NFT</button>
      </div>
    );
  }
}