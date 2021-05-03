import { apiClient } from '@/modules/apiClient'

export const getAllReleasesLatest = async () => {
  return (await apiClient.releases.$get()).contents
}

export const findRelease = async ({ id }: { id: string }) => {
  return await apiClient.releases._cmsId(id).$get()
}

export const getUserReleasesLatest = async ({ userId }: { userId: string }) => {
  return (await apiClient.releases.$get()).contents
}
