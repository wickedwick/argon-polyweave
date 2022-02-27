import { providers } from 'ethers'
import Web3 from 'web3'
declare var window: any

const getWeb3 = (): Promise<Web3> => new Promise((resolve, reject) => {
  window.addEventListener('load', async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum)
      try {
        await window.ethereum.enable()
        resolve(web3)
      } catch (error) {
        reject(error)
      }
    } else if (window.web3) {
      resolve(window.web3)
    } else {
      const provider = new Web3.providers.HttpProvider('http://localhost:8545')
      const web3 = new Web3(provider)
      resolve(web3)
    }
  })
})

export const connectWeb3 = async (connector: any) => {
  const p = new providers.Web3Provider(connector);
  await p._ready();
  return p
}

export const createProvider = async (c: any) => {
  if (!window?.ethereum?.isMetaMask) return;
  await window.ethereum.enable();
  const provider = await connectWeb3(window.ethereum);
  const chainId = `0x${c.chainId.toString(16)}`
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    })
  } catch (e: any) {
    if (e.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId, rpcUrls: c.rpcUrls, chainName: c.chainName
        }],
      });
    }
  }
  return provider;
}

export default getWeb3
