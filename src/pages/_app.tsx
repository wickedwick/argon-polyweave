import { WebBundlr } from '@bundlr-network/client'
import { Web3Provider } from '@ethersproject/providers'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import Nav from '../components/Nav'
import { BundlrContext } from '../context/BundlrContext'
import getWeb3 from '../services/web3'
import { BundlrContextParams } from '../types/Bundlr'

import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [web3, setWeb3] = useState<Web3 | null>(null)
  const [provider, setProvider] = useState<Web3Provider | undefined | void>(undefined)
  const [bundlr, setBundlr] = useState<WebBundlr>()
  const [address, setAddress] = useState<string>()
  const [balance, setBalance] = useState<string>()

  useEffect(() => {
    init()
  }, [])

  const init = async (): Promise<void> => {
    const w3 = await getWeb3()
    setWeb3(w3)
  }

  const bundlrState: BundlrContextParams = {
    provider,
    setProvider,
    bundlr,
    setBundlr,
    address,
    setAddress,
    balance,
    setBalance,
  }

  return (
    <BundlrContext.Provider value={bundlrState}>
      <Nav />
      <Component {...pageProps} />
    </BundlrContext.Provider>
  )
}

export default MyApp
