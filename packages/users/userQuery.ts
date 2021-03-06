import { User } from '@/types/user/types'

export const getAllUsers = async (): Promise<User[]> => {
  return [
    {
      userId: 'XXXX',
      name: 'hoge',
      image: 'https://meijin.dev',
    },
  ] as User[]
}

export const findUser = async ({ userId }: { userId: User['userId'] }) => {
  return {
    userId,
    name: 'hoge',
    image: 'https://meijin.dev',
  }
}
