/* eslint-disable */
import { MockClient, MockConfig } from 'aspida-mock'
import api from './$api'
import mock0 from './releases/index'
import mock1 from './releases/_cmsId@string/index'

export const mockRoutes = () => [
  { path: '/releases', methods: mock0 },
  { path: '/releases/_cmsId@string', methods: mock1 },
]

export default <U>(client: MockClient<U>, config?: MockConfig) => {
  client.attachRoutes(mockRoutes(), config)

  return api(client)
}
