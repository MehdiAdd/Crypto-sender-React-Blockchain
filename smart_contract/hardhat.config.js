require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/OGiELMJsEunkJ7Q6P_qUVLyufbjq7kzL',
      accounts: ['ee7d787dd31e858fcb3a5c74e9f7142ab57da8f68297a37709217eb208a23905'],
    },
  },
};