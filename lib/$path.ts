/* eslint-disable */
// prettier-ignore
export const pagesPath = {
  post: {
    $url: (url?: { hash?: string }) => ({ pathname: '/post' as const, hash: url?.hash })
  },
  releases: {
    _id: (id: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/releases/[id]' as const, query: { id }, hash: url?.hash })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/releases' as const, hash: url?.hash })
  },
  users: {
    _id: (id: string | number) => ({
      releases: {
        $url: (url?: { hash?: string }) => ({ pathname: '/users/[id]/releases' as const, query: { id }, hash: url?.hash })
      }
    })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

// prettier-ignore
export type PagesPath = typeof pagesPath
