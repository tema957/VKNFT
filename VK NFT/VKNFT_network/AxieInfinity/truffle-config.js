const HDWalletProvider = require('@truffle/hdwallet-provider');
const infuraKey = "<YOUR_INFURA_PROJECT_ID>";
const mnemonic = "<YOUR_METAMASK_MNEMONIC>";

module.exports = {

  networks: {

    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },

    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${infuraKey}`),
      network_id: 3,       // Идентификатор Ропстена
      gas: 5500000,        // Ropsten имеет более низкий лимит блоков, чем mainnet
      confirmations: 2,    // количество конфигов для ожидания между развертываниями. (по умолчанию: 0)
      timeoutBlocks: 200,  // количество блоков до истечения времени развертывания (минимум/по умолчанию: 50)
      skipDryRun: true     // Пропустить пробный запуск перед миграцией? (по умолчанию: false для публичных сетей)
    },

    mainnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://mainnet.infura.io/v3/${infuraKey}`),
      network_id: 1,       // идентификатор основной сети
      gas: 5500000,        // Газ отправляется с каждой транзакцией (по умолчанию: ~6700000)
      gasPrice: 45000000000,  // 45 Гвэй (в Вэй) (по умолчанию: 100 Гвэй)
      confirmations: 2,    // количество конфигов для ожидания между развертываниями. (по умолчанию: 0)
      timeoutBlocks: 200,  // количество блоков до истечения времени развертывания (минимум/по умолчанию: 50)
      skipDryRun: true     // Пропустить пробный запуск перед миграцией? (по умолчанию: false для публичных сетей)
    }

  },

  compilers: {
    solc: {
      version: "0.5.16",    // Получить точную версию из solc-bin (по умолчанию: версия трюфеля)
      settings: {          // Советы по оптимизации и evmVersion см. в документации по Solidity.
       optimizer: {
         enabled: true,
         runs: 200
       },
       evmVersion: "petersburg"
      }
    }
  }
};
