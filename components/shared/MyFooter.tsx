import styles from '@/styles/components/Footer.module.scss'
import Link from 'next/link'
import { pagesPath } from '../../lib/$path'

export const MyFooter = () => {
  return (
    <footer className={styles.footer}>
      <Link href={pagesPath.$url()} passHref>
        <a className={styles.link}>トップページ</a>
      </Link>
      <Link href={pagesPath.releases.$url()} passHref>
        <a className={styles.link}>リリースノート一覧</a>
      </Link>
    </footer>
  )
}
