import { WebBundlr } from "@bundlr-network/client"
import { Web3Provider } from "@ethersproject/providers"

export type BundlrContextParams = {
  provider: void | Web3Provider | undefined
  setProvider: (provider: void | Web3Provider | undefined) => void
  bundlr: WebBundlr | undefined
  setBundlr: (bundlr: WebBundlr | undefined) => void
  address: string | undefined
  setAddress: (address: string | undefined) => void
  balance: string | undefined
  setBalance: (balance: string | undefined) => void
}
