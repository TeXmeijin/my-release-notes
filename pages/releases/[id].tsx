import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import Loading from '../../components/parts/loading/Loading'
import { findRelease, getAllReleasesLatest } from '../../packages/releases/releaseQuery'
import { Release, ReleaseContentHeading, MasterReleaseContents } from '../../types/release/type'

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
      {Object.keys(release.content).map((key: ReleaseContentHeading) => {
        return (
          <div key={key}>
            <h3>{MasterReleaseContents[key]}</h3>
            <ReactMarkdown
              components={{
                h1: 'h3',
                h2: 'h3',
              }}
              children={release.content[key]}
            ></ReactMarkdown>
          </div>
        )
      })}
    </div>
  )
}

export default ReleaseDetailPage
