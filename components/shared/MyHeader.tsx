import styles from '@/styles/components/Header.module.scss'
import Link from 'next/link'
import { pagesPath } from '../../lib/$path'

export const MyHeader = () => {
  return (
    <>
      <header className={styles.header}>
        <Link href={pagesPath.$url()} passHref>
          <a className={styles.serviceName}>じぶんリリースノート</a>
        </Link>
      </header>
    </>
  )
}
