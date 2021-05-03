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
        features: `
- GraphQLをLaravel上に実装しました
- Recoilのドキュメントを一通り読みました
        `,
        keep: '# aaaa\n## aaaaa\n### bbbbbbb\n [https://manalink.jp](https://manalink.jp) ',
      },
    },
  }),
})
