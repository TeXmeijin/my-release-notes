import { Release } from '@/types/release/type'

/**
 * この実装はいずれバックエンド依存にしたいところ
 * @param param0
 * @returns
 */
export const isMajorVersionUp: (props: { currentRelease: Release; oldRelease: Release }) => boolean = ({
  currentRelease,
  oldRelease,
}) => {
  try {
    const currentMajor = parseInt(currentRelease.version.split('.')[0])
    const oldMajor = parseInt(oldRelease.version.split('.')[0])

    return oldMajor + 1 === currentMajor
  } catch (_) {
    return false
  }
}
