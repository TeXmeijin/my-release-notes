import styles from '@/styles/components/Footer.module.scss'
import Link from 'next/link'
import { pagesPath } from '../../lib/$path'

export const MyFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__body}>
        <Link href={pagesPath.$url()} passHref>
          <a className={styles.link}>トップページ</a>
        </Link>
        <Link href={pagesPath.releases.$url()} passHref>
          <a className={styles.link}>リリースノート一覧</a>
        </Link>
      </div>
      <div className={styles.footer__body}>
        <Link href="https://lottiefiles.com/29488-note-icon" passHref>
          <a target="_blank" className={styles.credit}>
            Animation by snowman on LottieFiles
          </a>
        </Link>
      </div>
    </footer>
  )
}
