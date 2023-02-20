import { config } from '@onflow/fcl'

config({
  // 'accessNode.api': 'https://rest-testnet.onflow.org',
  'accessNode.api': 'https://rest-mainnet.onflow.org',
  // 'discovery.wallet': 'https://fcl-discovery.onflow.org/testnet/authn',
  'discovery.wallet': 'https://fcl-discovery.onflow.org/authn',
  '0xPerson': '0x07fcc2a08e913dbe', // testnet
  '0xNONFUNGIBLETOKENADDRESS': '0x1d7e57aa55817448',
  '0xGOLAZOSADDRESS': '0x87ca73a41bb50ad5',
})
