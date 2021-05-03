import Page from '../components/shared/Page'
import Link from 'next/link'
import { pagesPath } from '../lib/$path'

const Top = () => {
  return (
    <Page title="じぶんリリースノートを始めよう">
      <h1>Top Page</h1>
      <div>
        <Link href={pagesPath.releases.$url()}>みんなのリリースノートを見る</Link>
      </div>
    </Page>
  )
}

export default Top
