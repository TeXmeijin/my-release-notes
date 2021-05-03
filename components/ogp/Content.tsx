import { Release } from '@/types/release/type'
import ReactDOM from 'react-dom/server'
import { ReleaseContent } from '../release/ReleaseContent'
const styles = `
  html, body {
    height: 100%;
    display: grid;
  }

  .main {
    padding: 64px;
  }
`

const Content = ({ release }: OgpProps) => (
  <html>
    <head>
      <style>{styles}</style>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css"
      ></link>
    </head>
    <body>
      <main className="main">
        <div className="content">
          <ReleaseContent content={release.content}></ReleaseContent>
        </div>
      </main>
    </body>
  </html>
)

export type OgpProps = {
  release: Release
}

export const GetMarkUp = (props: OgpProps) => ReactDOM.renderToStaticMarkup(<Content {...props} />)
