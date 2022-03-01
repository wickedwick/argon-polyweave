import { BigNumber } from 'bignumber.js'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { BundlrContext } from '../context/BundlrContext'
import initBundlr from '../services/bundlr'
import { createProvider } from '../services/web3'
import styles from '../styles/Nav.module.css'

const Nav = (): JSX.Element => {
  const [showControls, setShowControls] = useState(false)
  const { provider, setProvider, bundlr, setBundlr, address, setAddress, balance, setBalance } = useContext(BundlrContext)

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
      setBundlr(undefined)
      setAddress(undefined)
      return
    }

    const providerInstance = await createProvider(currency.opts).catch((e: Error) => { console.error(e) })
    setProvider(providerInstance)
  }

  const handleInitBundlr = async () => {
    if (!provider) {
      return
    }

    await initBundlr(provider, setAddress, setBundlr)
  }

  return (
    <>
      <nav>
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <Link href="/">
              <a className="text-blue hover:text-blue">Argon-Polyweave</a>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <button className="text-blue hover:text-blue" onClick={() => setShowControls(true)}>{address ? 'Logout' : 'Login'}</button>
          </li>
        </ul>
      </nav>
      {showControls && (
        <div className="p-5">
          <button className="bg-blue px-3 py-2 rounded-md" disabled={false} onClick={async () => await initProvider()}>
            {provider ? "Disconnect" : "Connect"}
          </button>
          <p>Connected Account: {address ?? "None"}</p>
          <button className="bg-blue px-3 py-2 rounded-md mr-3" disabled={!provider} onClick={async () => await handleInitBundlr()}>
            Connect to Bundlr
          </button>
          <button
            className="bg-blue mt-3 px-3 py-2 rounded-md"
            disabled={!provider} 
            onClick={async () => {
              address &&
              bundlr!
              .getBalance(address)
              .then((res: BigNumber) => {
                setBalance(res.toString())
              })
            }}
          >
            Get Matic Balance
          </button>
          {balance && bundlr && (
            <p>
              Matic Balance: {bundlr.utils.unitConverter(balance).toFixed(7, 2).toString()} {bundlr.currencyConfig.ticker.toLowerCase()}
            </p>
          )}

          <button onClick={() => setShowControls(false)}>&times;</button>
        </div>
      )}
    </>
  )
}

export default Nav
