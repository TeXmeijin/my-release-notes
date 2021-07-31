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
        {release.links && (
          <div className={styles.links}>
            <h3 className={styles.links__heading}>参考文献</h3>
            <a
              target="_blank"
              href="https://www.amazon.co.jp/gp/product/B08X11GD52/ref=as_li_tl?ie=UTF8&camp=247&creative=1211&creativeASIN=B08X11GD52&linkCode=as2&tag=meijin04-22&linkId=86fd74b70fdd51071fb5cd6b9065e42c"
              rel="noreferrer"
            >
              <img src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=JP&ASIN=B08X11GD52&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=meijin04-22" />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * <a target="_blank"  href="https://www.amazon.co.jp/gp/product/B08X11GD52/ref=as_li_tl?ie=UTF8&camp=247&creative=1211&creativeASIN=B08X11GD52&linkCode=as2&tag=meijin04-22&linkId=86fd74b70fdd51071fb5cd6b9065e42c"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=JP&ASIN=B08X11GD52&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=meijin04-22" ></a>
 */
