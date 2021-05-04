import { Release } from '../../types/release/type'
import Link from 'next/link'
import { ReleaseContent } from './ReleaseContent'
import styles from '@/styles/components/ReleaseItem.module.scss'
import { ReleaseDetail } from './ReleaseDetail'

type Props = {
  release: Release
}

const ReleaseItem = (props: Props) => {
  const href = `/releases/${props.release.releaseId}`
  return (
    <Link href="/releases/[id]" as={href} passHref>
      {/* for SEO, a tag should be set title attr. */}
      <a className={styles.releaseItem} title={props.release.version}>
        <ReleaseDetail release={props.release}></ReleaseDetail>
      </a>
    </Link>
  )
}

export default ReleaseItem
