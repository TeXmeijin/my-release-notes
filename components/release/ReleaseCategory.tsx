import React from 'react'
import styles from '@/styles/components/ReleaseCategory.module.scss'

export const ReleaseCategory: React.FC = ({ children }) => {
  return <div className={styles['release-category']}>{children}</div>
}
