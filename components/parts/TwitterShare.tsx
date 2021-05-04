import { PRODUCTION_ORIGIN } from '@/types/Constants'
import { useRouter } from 'next/router'
import styles from '@/styles/components/TwitterShare.module.scss'
import { Release } from '@/types/release/type'

export const TwitterShare = ({ release }: { release: Release }) => {
  const router = useRouter()

  const currentUrl = `${PRODUCTION_ORIGIN}${router.asPath}`

  const title = `${release.user.name} version${release.version}を公開しました`

  return (
    <a
      target="_blank"
      className={styles['twitter-share']}
      href={`https://twitter.com/intent/tweet?text=${title}%0a ${currentUrl}`}
      title="ツイート"
      rel="noreferrer"
    >
      <img className={styles['twitter-icon']} src="/twitter_logo.svg" alt="Twitter" />
      <span className={styles['twitter-label']}>このリリースをツイート</span>
    </a>
  )
}
