import { User } from '../user/types'

export type Release = {
  releaseId: string
  releasedAt: string
  version: string
  majorRelease: boolean
  content: ReleaseContent
  user: User
}

export type ReleaseContent = {
  [key in ReleaseContentHeading]?: string
}

export type ReleaseContentHeading = 'keep' | 'features' | 'thanksTo' | 'problem' | 'newUpdates' | 'reading'

export const MasterReleaseContents: { [key in ReleaseContentHeading]: string } = {
  // FIXME: 絵文字を使うとOGPで文字化けするので使わない
  features: 'Features',
  keep: 'Keep',
  thanksTo: 'Thanks To',
  problem: 'Problem',
  newUpdates: 'New Updates',
  reading: 'Reading',
}
