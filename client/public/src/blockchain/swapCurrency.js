import Web3 from 'web3'
import initiateContractTransaction from './initiateContractTransaction'

const swapCurrency = async ({ blockchainNetwork, walletAccountStore, connectedAccount }) => {

  // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
  // const web3 = new Web3(window.ethereum)
  // const accounts1 = await web3.eth.getAccounts()
  // await web3.eth.getBalance(account)


  const web3 = new Web3(window.ethereum) // Find the web3 object from the wallet

  const smartContractAddress = '0x19e2c4e30Bf86A5b69144D6a469ad33b6Af7ab5D'// findContractAddressBasedOntheBlockchainNetwork()

  const smartContract = await new web3.eth.Contract(smartContractAbiAsJSArrayObject, smartContractAddress)

  const contractFunction = smartContract.methods.swapExactInputSingle('', '', 12) // pass input as well if needed
  const result = await initiateContractTransaction({ web3, blockchainNetwork, contractFunction, walletAccountStore, connectedAccount })
  return result
}

export default swapCurrency