import { Release } from '../../types/release/type'
import Link from 'next/link'

type Props = {
  release: Release
}

const ReleaseItem = (props: Props) => {
  const href = `/releases/${props.release.releaseId}`
  return (
    <Link href="/releases/[id]" as={href} passHref>
      {/* for SEO, a tag should be set title attr. */}
      <a title={props.release.version}>{props.release.version}</a>
    </Link>
  )
}

export default ReleaseItem
