export type Release = {
  releaseId: string
  createdAt: string
  version: string
  content: {
    [key in ReleaseContent['type']]?: string
  }
}

type ReleaseContent = {
  type: 'keep' | 'features'
  label: string
}

export const MasterReleaseContents: ReleaseContent[] = [
  {
    type: 'features',
    label: '🚀 Features',
  },
]
