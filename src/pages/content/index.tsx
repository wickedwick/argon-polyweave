import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import styles from '../../styles/Home.module.css'

const content: NextPage = () => {
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

        <Link href="/content/new">
          <a className={styles.card}>
            <h2>New Content</h2>
          </a>
        </Link>
        <div className={styles.grid}>

        </div>
      </main>
    </div>
  )
}

export default content
