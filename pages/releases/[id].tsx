import { Release } from '@/types/release/type'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import styles from '@/styles/pages/Wrapper.module.scss'
import { useRouter } from 'next/router'
import React from 'react'
import Loading from '../../components/parts/loading/Loading'
import { findRelease, getAllReleasesLatest } from '../../packages/releases/releaseQuery'
import Page from '../../components/shared/Page'
import { PRODUCTION_ORIGIN } from '@/types/Constants'
import { ReleaseDetail } from '@/components/release/ReleaseDetail'
import { TwitterShare } from '../../components/parts/TwitterShare'

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
    <Page
      title={`${release.user.name}さんのリリース | v${release.version}`}
      ogp={`${PRODUCTION_ORIGIN}/api/ogp/${release.releaseId}`}
    >
      <div className={styles.page}>
        <ReleaseDetail release={release}></ReleaseDetail>
        <div
          style={{
            marginTop: '24px',
            marginBottom: '40px',
          }}
        >
          <TwitterShare release={release}></TwitterShare>
        </div>
      </div>
    </Page>
  )
}

export default ReleaseDetailPage
