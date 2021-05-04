import { Release } from '@/types/release/type'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import styles from '@/styles/pages/Wrapper.module.scss'
import detailNaviStyles from '@/styles/components/ReleaseDetailNavigation.module.scss'
import { useRouter } from 'next/router'
import React from 'react'
import Loading from '../../components/parts/loading/Loading'
import {
  findRelease,
  findReleaseBeforeOne,
  getAllReleasesLatest,
  findReleaseAfterOne,
} from '../../packages/releases/releaseQuery'
import Page from '../../components/shared/Page'
import { MAJOR_RELEASE, PRODUCTION_ORIGIN } from '@/types/Constants'
import { ReleaseDetail } from '@/components/release/ReleaseDetail'
import { TwitterShare } from '../../components/parts/TwitterShare'
import Link from 'next/link'
import { pagesPath } from '../../lib/$path'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { isMajorVersionUp } from '../../packages/releases/releaseSpecifications'
import { ReleaseCategory } from '@/components/release/ReleaseCategory'

export const getStaticProps: GetStaticProps<{
  release: Release
  releaseBeforeOne?: Release
  releaseAfterOne?: Release
}> = async (context: GetStaticPropsContext<{ id: string }>) => {
  const { id } = context.params

  const release = await findRelease({ id })

  return {
    props: {
      release,
      releaseBeforeOne: await findReleaseBeforeOne({ id }),
      releaseAfterOne: await findReleaseAfterOne({ id }),
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

const ReleaseDetailPage = ({
  release,
  releaseBeforeOne,
  releaseAfterOne,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
        <ReleaseDetail
          release={release}
          releaseCategory={
            isMajorVersionUp({ currentRelease: release, oldRelease: releaseBeforeOne }) ? (
              <ReleaseCategory>{MAJOR_RELEASE}</ReleaseCategory>
            ) : null
          }
        ></ReleaseDetail>
        <div className={detailNaviStyles['release-navi-list']}>
          {releaseAfterOne ? (
            <Link href={pagesPath.releases._id(releaseAfterOne.releaseId).$url()} passHref>
              <a className={detailNaviStyles['release-navi']}>
                <HiChevronLeft></HiChevronLeft>
                <span className={detailNaviStyles['release-navi__text']}>v{releaseAfterOne.version}</span>
              </a>
            </Link>
          ) : (
            <span className={detailNaviStyles['release-navi']}></span>
          )}
          {releaseBeforeOne ? (
            <Link href={pagesPath.releases._id(releaseBeforeOne.releaseId).$url()} passHref>
              <a className={detailNaviStyles['release-navi']}>
                <span className={detailNaviStyles['release-navi__text']}>v{releaseBeforeOne.version}</span>
                <HiChevronRight></HiChevronRight>
              </a>
            </Link>
          ) : null}
        </div>
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
