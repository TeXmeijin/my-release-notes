import Page from '@/components/shared/Page'
import styles from '@/styles/pages/Post.module.scss'
import pageStyles from '@/styles/pages/Wrapper.module.scss'

import Lottie from 'react-lottie'
import * as animationData from '@/assets/29488-note-icon.json'

const Post = () => {
  return (
    <Page title="投稿する">
      <div className={pageStyles.page}>
        <h1 className={styles.heading}>投稿機能は今後実装予定です！</h1>
        <div className={styles.caution}>
          <p>
            ”じぶんRelease Notes”は現在ベータ版として、開発者のmeijin(
            <a href="https://meijin.dev">https://meijin.dev</a>
            )のみが投稿可能です。本サービスに関するお問合せ、機能開発ロードマップ等は開発者までご連絡ください。
          </p>
        </div>
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
    </Page>
  )
}

export default Post
