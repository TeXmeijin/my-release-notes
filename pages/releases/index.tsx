import ReleaseItem from '@/components/release/ReleaseItem'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getAllReleasesLatest } from '../../packages/releases/releaseQuery'
import { Release } from '../../types/release/type'
import Page from '../../components/shared/Page'

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
      <div>
        {releases.map(release => {
          return <ReleaseItem key={release.releaseId} release={release}></ReleaseItem>
        })}
      </div>
    </Page>
  )
}

export default ReleasesPage
