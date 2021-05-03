import Loading from '@/components/parts/loading/Loading'
import ReleaseItem from '@/components/release/ReleaseItem'
import { getUserReleasesLatest } from '@/packages/releases/releaseQuery'
import { getAllUsers } from '@/packages/users/userQuery'
import { Release } from '@/types/release/type'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'

export const getStaticProps: GetStaticProps<{ releases: Release[] }> = async (
  context: GetStaticPropsContext<{ id: string }>
) => {
  const releases = await getUserReleasesLatest({ userId: 'XXXX' })

  return {
    props: {
      releases,
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: (await getAllUsers()).map(user => {
      return {
        params: {
          id: user.userId,
        },
      }
    }),
    fallback: true,
  }
}

const ReleasesPage = ({ releases }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return Loading
  }

  return (
    <div>
      <div>
        {releases.map(release => {
          return <ReleaseItem key={release.releaseId} release={release}></ReleaseItem>
        })}
      </div>
    </div>
  )
}

export default ReleasesPage
