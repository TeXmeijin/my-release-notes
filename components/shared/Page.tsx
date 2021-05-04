import { DEFAULT_SITE_NAME, PRODUCTION_ORIGIN } from '@/types/Constants'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ReactNode, useEffect } from 'react'
import { MyHeader } from './MyHeader'
import { MyFooter } from './MyFooter'
type Props = {
  children: ReactNode[] | ReactNode
} & Partial<Meta>

export type Meta = {
  title: string
  titleSuffix: string
  description: string
  // OGP画像
  ogp: string
  // canonical。Path以降のみでよい
  canonicalPath: string
  noindex: boolean
}

const Page: React.FC<Props> = ({ children, ...meta }) => {
  const router = useRouter()

  const computedMeta = ((): Meta => {
    const defaultMeta: Meta = {
      title: DEFAULT_SITE_NAME,
      titleSuffix: 'じぶんRelease Notes',
      description:
        'あなた自身のリリースノートを作成しよう！毎週、毎月、毎年お好きな節目で日記代わりに自分が勉強した内容、やったこと、できるようになったことなどを記録しよう',
      ogp: `${PRODUCTION_ORIGIN}/meta/ogp.png`,
      // hashを取り除く方法がこれしか浮かばなかった
      canonicalPath: router.asPath.replace(/#[a-zA-Z0-9]+$/, ''),
      noindex: !!process.env.NEXT_PUBLIC_NO_INDEX,
    }
    if (meta)
      return {
        ...defaultMeta,
        ...meta,
      }

    return defaultMeta
  })()

  // @see https://zenn.dev/tak_dcxi/articles/690caf6e9c4e26
  useEffect(() => {
    const viewport = document.querySelector('meta[name="viewport"]')
    function switchViewport() {
      const value = window.outerWidth > 360 ? 'width=device-width,initial-scale=1' : 'width=360'
      if (viewport.getAttribute('content') !== value) {
        viewport.setAttribute('content', value)
      }
    }
    addEventListener('resize', switchViewport, false)
    switchViewport()
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>{`${computedMeta.title} | ${computedMeta.titleSuffix}`}</title>
        <meta name="description" content={computedMeta.description}></meta>
        {computedMeta.noindex ? <meta name="robots" content="noindex"></meta> : null}

        <link rel="canonical" href={`${PRODUCTION_ORIGIN}${computedMeta.canonicalPath}`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" key="twcard" />
        <meta name="twitter:creator" content="@meijin_garden" key="twhandle" />

        {/* Open Graph */}
        <meta property="og:type" content="website" key="ogtype" />
        <meta property="og:url" content={`${PRODUCTION_ORIGIN}${router.asPath}`} key="ogurl" />
        <meta property="og:image" content={computedMeta.ogp} key="ogimage" />
        <meta property="og:site_name" content={DEFAULT_SITE_NAME} key="ogsitename" />
        <meta property="og:title" content={`${computedMeta.title} | ${computedMeta.titleSuffix}`} key="ogtitle" />
        <meta property="og:description" content={computedMeta.description} key="ogdesc" />
      </Head>
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <MyHeader />
        <section
          style={{
            flex: 1,
          }}
        >
          {children}
        </section>
        <MyFooter></MyFooter>
      </main>
    </>
  )
}

export default Page
