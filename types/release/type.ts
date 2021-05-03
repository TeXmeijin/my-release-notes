export type Release = {
  releaseId: string
  createdAt: string
  version: string
  content: {
    [key in ReleaseContent['type']]?: string
  }
}

export type ReleaseContent = {
  type: 'keep' | 'features'
  label: string
}

export const MasterReleaseContents: ReleaseContent[] = [
  {
    type: 'features',
    label: '🚀 Features',
  },
]
