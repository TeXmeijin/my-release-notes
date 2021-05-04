import { apiClient } from '@/modules/apiClient'
import { Release } from '@/types/release/type'

export const getAllReleasesLatest = async () => {
  return (await apiClient.releases.$get()).contents
}

export const findRelease = async ({ id }: { id: string }) => {
  return await apiClient.releases._cmsId(id).$get()
}

export const findReleaseAfterOne: ({ id: string }) => Promise<Release | null> = async ({ id }) => {
  const targetRelease = await apiClient.releases._cmsId(id).$get()
  const afterReleases = (
    await apiClient.releases.$get({
      query: {
        filters: `releasedAt[greater_than]${targetRelease.releasedAt}`,
      },
    })
  ).contents

  return afterReleases.length ? afterReleases[0] : null
}

export const findReleaseBeforeOne: ({ id: string }) => Promise<Release | null> = async ({ id }) => {
  const targetRelease = await apiClient.releases._cmsId(id).$get()
  const beforeReleases = (
    await apiClient.releases.$get({
      query: {
        filters: `releasedAt[less_than]${targetRelease.releasedAt}`,
      },
    })
  ).contents

  return beforeReleases.length ? beforeReleases[0] : null
}

export const getUserReleasesLatest = async ({ userId }: { userId: string }) => {
  return (await apiClient.releases.$get()).contents
}
