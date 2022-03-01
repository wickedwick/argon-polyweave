import { WebBundlr } from '@bundlr-network/client'
import { Web3Provider } from '@ethersproject/providers'
import React from 'react'

export const BundlrContext = React.createContext({
  provider: undefined,
  setProvider: (provider: void | Web3Provider | undefined): void => {},
  bundlr: undefined,
  setBundlr: (bundlr: WebBundlr | undefined): void => {},
  address: '',
  setAddress: (address: string | undefined): void => {},
  balance: '',
  setBalance: (balance: string | undefined): void => {},
})
