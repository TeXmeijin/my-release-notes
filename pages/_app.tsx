import '../styles/reset.scss'
import '../styles/github-markdown.css'

import type { AppProps /*, AppContext */ } from 'next/app'
import { useRouter } from 'next/router'

import * as gtag from '@/lib/gtag'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    if (!gtag.existsGaId) {
      return
    }

    const handleRouteChange = path => {
      gtag.pageview(path)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <Component {...pageProps} />
}

export default MyApp
