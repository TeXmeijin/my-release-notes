import { Release } from '@/types/release/type'
import ReactDOM from 'react-dom/server'
import { ReleaseContent } from '../release/ReleaseContent'
const styles = `
  html, body {
    height: 100%;
    display: grid;
  }

  h1 { margin: auto }
`

const Content = ({ release }: OgpProps) => (
  <html>
    <head>
      <style>{styles}</style>
    </head>
    <body>
      <div>
        <ReleaseContent content={release.content}></ReleaseContent>
      </div>
    </body>
  </html>
)

export type OgpProps = {
  release: Release
}

export const GetMarkUp = (props: OgpProps) => ReactDOM.renderToStaticMarkup(<Content {...props} />)
