import { WebBundlr } from "@bundlr-network/client"
import { Web3Provider } from "@ethersproject/providers"

const bundlerHttpAddress: string = 'https://node1.bundlr.network'

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
