const TronWeb = require('tronweb');

const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
});

module.exports = {
  networks: {
    development: {
      from: "YOUR_ADDRESS", // Замените на свой адрес
      privateKey: "YOUR_PRIVATE_KEY", // Замените своим закрытым ключом
      consume_user_resource_percent: 30,
      fee_limit: 1e9,
      fullHost: "http://127.0.0.1:9090",
      network_id: "*"
    },
    mainnet: {
      from: "YOUR_ADDRESS", // Замените на свой адрес
      privateKey: "YOUR_PRIVATE_KEY", // Замените своим закрытым ключом
      consume_user_resource_percent: 30,
      fee_limit: 1e9,
      fullHost: "https://api.trongrid.io",
      network_id: "*"
    }
  },
  compilers: {
    solc: {
      version: "0.5.16",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
