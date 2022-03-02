import { WebBundlr } from "@bundlr-network/client"
import { Web3Provider } from "@ethersproject/providers"

const bundlerHttpAddress: string = 'https://node1.bundlr.network'

export const currency = {
  providers: ["MetaMask"],
  opts: {
    chainId: process.env.NODE_ENV === 'production' ? 137 : 80001,
    chainName: process.env.NODE_ENV === 'production' ? 'Polygon Mainnet' : 'Polygon Testnet',
    rpcUrls: process.env.NODE_ENV === 'production' ? ["https://polygon-rpc.com"] : ['https://rpc-mumbai.maticvigil.com'],
  },
}

const initBundlr = async (provider: Web3Provider, setAddress: (address: string) => void, setBundler: (bundlr: WebBundlr) => void) => {
  const bundlr = new WebBundlr(bundlerHttpAddress, 'matic', provider)
  try {
    await bundlr.utils.getBundlerAddress('matic')
  } catch {
    console.error(`Failed to connect to bundlr ${bundlerHttpAddress}`)
    return
  }
  try {
    await bundlr.ready()
  } catch (err) {
    console.error(err)
  }

  if (!bundlr.address) {
    console.error("something went wrong")
  }

  console.log('status: success', `Connected to ${bundlerHttpAddress}`)
  setAddress(bundlr?.address)
  setBundler(bundlr)
}

export default initBundlr
