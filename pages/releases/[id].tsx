import { ReleaseContent } from '@/components/release/ReleaseContent'
import { Release } from '@/types/release/type'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import Loading from '../../components/parts/loading/Loading'
import { findRelease, getAllReleasesLatest } from '../../packages/releases/releaseQuery'

export const getStaticProps: GetStaticProps<{ release: Release }> = async (
  context: GetStaticPropsContext<{ id: string }>
) => {
  const { id } = context.params

  const release = await findRelease({ id })

  return {
    props: {
      release,
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: (await getAllReleasesLatest()).map(release => {
      return {
        params: {
          id: release.releaseId,
        },
      }
    }),
    fallback: true,
  }
}

const ReleaseDetailPage = ({ release }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return Loading
  }

  return (
    <div>
      <Head>
        <title>{release.version}</title>
      </Head>
      <h1>{release.version}</h1>
      <ReleaseContent content={release.content}></ReleaseContent>
    </div>
  )
}

export default ReleaseDetailPage
