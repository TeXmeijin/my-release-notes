import { User } from '@/types/user/types'

export const getAllUsers = async (): Promise<User[]> => {
  return [
    {
      userId: 'XXXX',
      name: 'hoge',
      image: 'https://manalink.jp',
      createdAt: '2020-08-09T13:49:53.413Z',
    },
  ] as User[]
}

export const findUser = async ({ userId }: { userId: User['userId'] }) => {
  return {
    userId,
    name: 'hoge',
    image: 'https://manalink.jp',
    createdAt: '2020-08-09T13:49:53.413Z',
  }
}
