import { Release } from '../../types/release/type'
import Link from 'next/link'
import { ReleaseContent } from './ReleaseContent'
import styles from '@/styles/components/ReleaseItem.module.scss'

type Props = {
  release: Release
}

const ReleaseItem = (props: Props) => {
  const href = `/releases/${props.release.releaseId}`
  return (
    <Link href="/releases/[id]" as={href} passHref>
      {/* for SEO, a tag should be set title attr. */}
      <a className={styles.releaseItem} title={props.release.version}>
        <h3>{props.release.version}</h3>
        <ReleaseContent content={props.release.content}></ReleaseContent>
      </a>
    </Link>
  )
}

export default ReleaseItem
