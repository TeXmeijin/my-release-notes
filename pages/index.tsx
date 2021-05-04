import Page from '../components/shared/Page'
import Link from 'next/link'
import { pagesPath } from '../lib/$path'
import styles from '@/styles/pages/Top.module.scss'
import { HiChevronRight } from 'react-icons/hi'
import Lottie from 'react-lottie'
import * as animationData from '@/assets/29488-note-icon'

const Top = () => {
  return (
    <Page title="じぶんリリースノートを始めよう">
      <div className={styles.wrapper}>
        <div className={styles['fv']}>
          <h1 className={styles.heading}>
            ちょっとした<br></br>”できた！”を残そう
          </h1>
          <p className={styles.statement}>
            ”じぶんRelease Notes”は、あなた自身が学んだことや
            <br />
            できるようになったことを かんたんな”リリース”にまとめて記録できるログです。
          </p>
          <div className={styles['fv-animation']}>
            <Lottie
              width={300}
              height={300}
              options={{
                loop: false,
                animationData: animationData,
              }}
            ></Lottie>
          </div>
        </div>
        <div className={styles.links}>
          <Link href={pagesPath.releases.$url()} passHref>
            <a className={styles['release-list']}>
              公開中のリリースノートを見る
              <HiChevronRight size={32} color="#777"></HiChevronRight>
            </a>
          </Link>
        </div>
        <div className={styles.caution}>
          <div>WARNING</div>
          <p>
            ”じぶんRelease Notes”は現在ベータ版として、開発者のmeijin(
            <a href="https://meijin.dev">https://meijin.dev</a>
            )のみが投稿可能です。本サービスに関するお問合せ、機能開発ロードマップ等は開発者までご連絡ください。
          </p>
        </div>
      </div>
    </Page>
  )
}

export default Top
