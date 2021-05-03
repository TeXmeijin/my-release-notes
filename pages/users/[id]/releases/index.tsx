import Loading from '@/components/parts/loading/Loading'
import ReleaseItem from '@/components/release/ReleaseItem'
import { getUserReleasesLatest } from '@/packages/releases/releaseQuery'
import { findUser, getAllUsers } from '@/packages/users/userQuery'
import { Release } from '@/types/release/type'
import { User } from '@/types/user/types'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import Page from '../../../../components/shared/Page'

export const getStaticProps: GetStaticProps<{ releases: Release[]; user: User }> = async (
  context: GetStaticPropsContext<{ id: string }>
) => {
  const releases = await getUserReleasesLatest({ userId: context.params.id })
  const user = await findUser({ userId: context.params.id })

  return {
    props: {
      releases,
      user,
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

const ReleasesPage = ({ releases, user }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return Loading
  }

  return (
    <Page title={`${user.name}さんのリリースノート一覧`}>
      <div>
        {releases.map(release => {
          return <ReleaseItem key={release.releaseId} release={release}></ReleaseItem>
        })}
      </div>
    </Page>
  )
}

export default ReleasesPage
