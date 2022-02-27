import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import { Web3Provider } from '@ethersproject/providers'
import { providers } from 'ethers'
import getWeb3, { createProvider } from '../services/web3'
import { WebBundlr } from '@bundlr-network/client'
import BigNumber from 'bignumber.js'
import initBundlr from '../services/bundlr'
declare var window: any

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [web3, setWeb3] = useState<Web3 | null>(null)
  const [provider, setProvider] = useState<Web3Provider | undefined>(undefined)
  const [bundler, setBundler] = useState<WebBundlr>()
  const [address, setAddress] = useState<string>()
  const [balance, setBalance] = useState<string>()

  useEffect(() => {
    init()
  }, [])

  const init = async (): Promise<void> => {
    const w3 = await getWeb3()
    setWeb3(w3)
  }

  const currency = {
    providers: ["MetaMask"],
    opts: {
      chainId: 137,
      chainName: 'Polygon Mainnet',
      rpcUrls: ["https://polygon-rpc.com"],
    },
  }

  const initProvider = async () => {
    if (provider) {
      setProvider(undefined)
      setBundler(undefined)
      setAddress(undefined)
      return
    }

    const providerInstance = await createProvider(currency.opts).catch((e: Error) => { console.error(e) })
    console.log('instance', providerInstance)
    setProvider(providerInstance)
  }

  const handleInitBundlr = async () => {
    if (!provider) {
      return
    }

    await initBundlr(provider, setAddress, setBundler)
  }

  return (
    <>
      <button disabled={false} onClick={async () => await initProvider()}>
        {provider ? "Disconnect" : "Connect"}
      </button>
      <p>Connected Account: {address ?? "None"}</p>
      <button disabled={!provider} onClick={async () => await handleInitBundlr()}>
        Connect to Bundlr
      </button>
      <button
        onClick={async () => {
          address &&
            bundler!
              .getBalance(address)
              .then((res: BigNumber) => {
                setBalance(res.toString())
              })
          //await toggleRefresh()
        }}

      >
        Get Matic Balance
      </button>
      {balance && bundler && (
        <p>
          Matic Balance: {bundler.utils.unitConverter(balance).toFixed(7, 2).toString()} {bundler.currencyConfig.ticker.toLowerCase()}
        </p>
      )}
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
