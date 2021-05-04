import styles from '@/styles/components/ReleaseDetail.module.scss'
import { MAJOR_RELEASE } from '@/types/Constants'
import { Release as ReleaseType } from '@/types/release/type'
import { ReleaseCategory } from './ReleaseCategory'
import { ReleaseContent } from './ReleaseContent'

export const ReleaseDetail = ({ release }: { release: ReleaseType }) => {
  return (
    <div className={styles.root}>
      <div className={styles.author}>
        <img className={styles.authorImage} src={release.user.image}></img>
        <span className={styles.authorName}>{release.user.name}</span>
      </div>
      <div className={styles.releaseContainer}>
        <h1 className={styles.releaseContainer__name}>
          {release.version}
          {release.majorRelease ? (
            <div className={styles.releaseContainer__category}>
              <ReleaseCategory>{MAJOR_RELEASE}</ReleaseCategory>
            </div>
          ) : null}
        </h1>
        <span className={styles.releaseContainer__version}>on {new Date(release.releasedAt).toDateString()}</span>
        <div className={styles.releaseContainer__body}>
          <ReleaseContent content={release.content}></ReleaseContent>
        </div>
      </div>
    </div>
  )
}
