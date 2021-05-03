import ReleaseItem from '@/components/release/ReleaseItem'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getAllReleasesLatest } from '../../packages/releases/releaseQuery'
import { Release } from '../../types/release/type'

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
    <div>
      {releases.map(release => {
        return <ReleaseItem key={release.releaseId} release={release}></ReleaseItem>
      })}
    </div>
  )
}

export default ReleasesPage
