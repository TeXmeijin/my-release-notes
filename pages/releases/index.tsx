import ReleaseItem from '@/components/release/ReleaseItem'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getAllReleasesLatest } from '../../packages/releases/releaseQuery'
import { Release } from '../../types/release/type'
import Page from '../../components/shared/Page'
import pageStyles from '@/styles/pages/Wrapper.module.scss'
import styles from '@/styles/pages/ReleaseList.module.scss'

export const getStaticProps: GetStaticProps<{ releases: Release[] }> = async () => {
  const releases = await getAllReleasesLatest()

  return {
    props: {
      releases,
    },
    revalidate: 1,
  }
}

const ReleasesPage = ({ releases }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Page title="みんなのリリースノート">
      <div className={pageStyles.page}>
        <h1 className={styles['release-list-header']}>みんなのリリースノート</h1>
        <ul className={styles['release-list']}>
          {releases.map(release => {
            return (
              <li className={styles['release-list__item']} key={release.releaseId}>
                <ReleaseItem release={release}></ReleaseItem>
              </li>
            )
          })}
        </ul>
      </div>
    </Page>
  )
}

export default ReleasesPage
