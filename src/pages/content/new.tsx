import BigNumber from 'bignumber.js'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { BundlrContext } from '../../context/BundlrContext'

import styles from '../../styles/Home.module.css'

const newContent: NextPage = () => {
  const { provider, setProvider, bundlr, setBundlr, address, setAddress, balance, setBalance } = useContext(BundlrContext)
  const [img, setImg] = useState<Buffer>();
  const [price, setPrice] = useState<BigNumber>();

  const handleFileClick = () => {
    var fileInputEl = document.createElement("input");
    fileInputEl.type = "file";
    fileInputEl.accept = "image/*";
    fileInputEl.style.display = "none";
    document.body.appendChild(fileInputEl);
    fileInputEl.addEventListener("input", function (e) {
      handleUpload(e as any);
      document.body.removeChild(fileInputEl);
    });
    fileInputEl.click();
  };

  const handleUpload = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    let files = evt.target.files
    let reader = new FileReader()
    if (files && files.length > 0) {
      reader.onload = function () {
        if (reader.result) {
          setImg(Buffer.from(reader.result as ArrayBuffer));
        }
      }
      reader.readAsArrayBuffer(files[0])
    }
  }

  const handlePrice = async () => {
    if (img) {
      const price = await bundlr?.utils.getPrice('matic' as string, img.length)
      setPrice(price?.toString())
    }
  }

  const uploadFile = async () => {
    if (img) {
      await bundlr?.uploader.upload(img, [{ name: "Content-Type", value: "image/png" }])
        .then((res: { status: number; data: { id: any } }) => {
          console.log({
            status: res?.status === 200 || res?.status === 201 ? "success" : "error",
            title: res?.status === 200 || res?.status === 201 ? "Successful!" : `Unsuccessful! ${res?.status}`,
            description: res?.data.id ? `https://arweave.net/${res.data.id}` : undefined,
            duration: 15000,
          });
        })
        .catch(e => { console.error({ status: "error", title: `Failed to upload - ${e}` }) })
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Argon Polyweave - Content</title>
        <meta name="description" content="Content management on the permanent web." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Argon Polyweave
        </h1>

        <Link href="/content">
          <a>
            <h2>back</h2>
          </a>
        </Link>
        <div className="flex">
          <div className="flex-1 w-64">
            column one
            <button className="bg-blue rounded block px-3 py-2 mb-3" onClick={handleFileClick}>Select file from Device</button>
          </div>
          <div className="flex-none w-32">
            {
              img && (
                <>
                  <img src={`data:image/png;base64,${img.toString('base64')}`} />
                  <button className="bg-blue rounded block px-3 py-2" onClick={handlePrice}>Get Price</button>
                  {price && (
                    <p>{`Cost: ${bundlr?.utils.unitConverter(price).toString()} ${bundlr?.currencyConfig.ticker.toLowerCase()} `}</p>
                  )}
                  {balance && bundlr && (
                    <button className="bg-blue rounded block px-3 py-2 mb-3" onClick={uploadFile}>Upload to Bundlr Network</button>
                  )}
                </>
              )
            }
            {bundlr && (
              <p>
                Matic Balance: {bundlr?.utils.unitConverter(balance).toFixed(7, 2).toString()} {bundlr?.currencyConfig.ticker.toLowerCase()}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default newContent