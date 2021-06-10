import Layout from '../components/Layout'
import '../styles/globals.css'
import Head from 'next/head'
import { DataProvider } from '../store/GlobalState'

function MyApp({ Component, pageProps }) {
  return(
    <DataProvider>
      <Layout>
        <Head>
          <title>Žolių fėja</title>
        </Head>
        <Component {...pageProps} />
    </Layout>
    </DataProvider>
    
  )
   
}

export default MyApp
