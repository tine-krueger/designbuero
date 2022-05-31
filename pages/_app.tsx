import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/layout'
import { NextPage } from 'next'
import { NGColor } from '../types/colors'

export type NextPageWithLayout = {
  headerColor?: NGColor
  footerClass?: string
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout & NextPage
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {


  return (
    <Layout headerClass={`c-bg--${Component.headerColor}`} footerClass={Component.footerClass}>
      <Component {...pageProps} />
    </Layout>
  
  )
}

export default MyApp
