import { Release } from '../../../release/type'
import { mockMethods } from 'aspida-mock/dist'
export interface Methods {
  get: {
    resBody: Release
  }
}

export default mockMethods<Methods>({
  get: () => ({
    status: 200,
    resHeaders: {},
    resBody: {
      releaseId: 'XXXX',
      createdAt: '2020-08-09T13:49:53.413Z',
      version: '26.0.0',
      content: {
        features: '# ほげほげ見出し\n## あああああ\n### ああああああ\nhogehoge',
        keep: '# aaaa\n## aaaaa\n### bbbbbbb',
      },
    },
  }),
})
