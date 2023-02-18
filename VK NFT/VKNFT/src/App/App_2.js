import React, { useState } from 'react';
import {View, Button, Text, Card, ModalRoot, ModalPage, ModalPageHeader} from '@vkontakte/vkui';

const App2 = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (id) => {
    setActiveModal(id);
  }

  const closeModal = () => {
    setActiveModal(null);
  }

  const handleBuy = () => {
    console.log('NFT purchased');
    closeModal();
  }

  return (
    <View activePanel='main'>
      <Panel id='main'>
        <Text>Welcome to NFT marketplace</Text>
        <Card>
          <Text>NFT #1</Text>
          <Button onClick={() => openModal('purchase')}>Buy</Button>
        </Card>
        <ModalRoot activeModal={activeModal}>
          <ModalPage
            id='purchase'
            header={
              <ModalPageHeader
                title='Purchase NFT'
                onClose={closeModal}
              />
            }
          >
            <Text>Do you want to purchase this NFT?</Text>
            <Button onClick={handleBuy}>Yes</Button>
            <Button onClick={closeModal}>No</Button>
          </ModalPage>
        </ModalRoot>
      </Panel>
    </View>
  );
}

export default App2;