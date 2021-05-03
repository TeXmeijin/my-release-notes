import styles from '@/styles/components/Header.module.scss'

export const MyHeader = () => {
  return (
    <>
      <header className={styles.header}>
        <span className={styles.serviceName}>じぶんリリースノート</span>
      </header>
    </>
  )
}
