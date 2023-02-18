import FungibleToken from "./FungibleToken.cdc"

// Название контракта
pub contract NonFungibleToken: FungibleToken {

    // Тип для NFT, содержит идентификатор и некоторые произвольные данные.
    pub struct NFT {
        pub var id: UInt64
        pub var data: {String: String}
    }

    // Хранилище NFT
    pub var nfts: {UInt64: NFT}

    // Событие, возникающее при создании NFT
    pub event NFTCreated(id: UInt64)

    //Событие, возникающее при передаче NFT
    pub event NFTTransferred(id: UInt64, from: Address, to: Address)

    // Создайте новый NFT с заданным идентификатором и данными
    pub fun mintNFT(id: UInt64, data: {String: String}) {
        // Check that the given ID is not already in use
        if (self.nfts[id] != nil) {
            panic("NFT with this ID already exists")
        }

        // Создайте NFT и сохраните его
        let nft <- NFT(id: id, data: data)
        self.nfts[id] = nft

        // Отправить событие
        emit NFTCreated(id: id)
    }

    // Перенос NFT на другую учетную запись
    pub fun transferNFT(id: UInt64, to: Address) {
        // Check that the NFT exists
        let nft = self.nfts[id]
        if (nft == nil) {
            panic("NFT does not exist")
        }

        // Убедитесь, что отправитель владеет NFT
        let sender = getAccountAddress(authentication: AuthAccount)
        let owner = self.ownerOf(id: id)
        if (owner != sender) {
            panic("Sender does not own this NFT")
        }

        // Передайте NFT и создайте событие
        self.nfts[id]!.owner = to
        emit NFTTransferred(id: id, from: sender, to: to)
    }

    // Получить владельца NFT
    pub fun ownerOf(id: UInt64): Address? {
        return self.nfts[id]?.owner
    }
}
