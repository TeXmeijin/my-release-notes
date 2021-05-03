export type Release = {
  releaseId: string
  createdAt: string
  version: string
  content: ReleaseContent
}

export type ReleaseContent = {
  [key in ReleaseContentHeading]?: string
}

export type ReleaseContentHeading = 'keep' | 'features'

export const MasterReleaseContents: { [key in ReleaseContentHeading]: string } = {
  features: '🚀 Features',
  keep: 'Keep',
}
