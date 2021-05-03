import { Release } from '../../release/type'
import { mockMethods } from 'aspida-mock/dist'

export interface Methods {
  get: {
    resBody: { contents: Release[] }
  }
}

export default mockMethods<Methods>({
  get: () => ({
    status: 200,
    resHeaders: {},
    resBody: {
      contents: [
        {
          releaseId: 'XXXX',
          createdAt: '2020-08-09T13:49:53.413Z',
          version: '26.0.0',
          content: {
            features: '## あああああ\n### ああああああ\nhogehoge',
          },
          user: {
            userId: 'YYYY',
            name: 'meijin',
            image: 'https://lh3.googleusercontent.com/a-/AOh14GjOZkrZMgKwcEyykl5_iULVEVkUUJd793r9_z8DF4s=s250-c',
            createdAt: '2020-08-09T13:49:53.413Z',
          },
        },
      ],
    },
  }),
})
