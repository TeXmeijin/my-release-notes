import styles from '@/styles/components/Header.module.scss'
import Link from 'next/link'
import { pagesPath } from '../../lib/$path'

export const MyHeader = () => {
  return (
    <header className={styles.header}>
      <Link href={pagesPath.$url()} passHref>
        <a className={styles.serviceName}>じぶんRelease Notes(β)</a>
      </Link>
      <Link href={pagesPath.post.$url()} passHref>
        <a className={styles.postButton}>投稿する</a>
      </Link>
    </header>
  )
}
