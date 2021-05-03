import { Release } from '@/types/release/type'
import ReactDOM from 'react-dom/server'
import { ReleaseContent } from '../release/ReleaseContent'
const globalStyles = `
  html, body {
    height: 100%;
    display: grid;
    padding: 0;
    margin: 0;
  }

  .markdown-body {
    font-size: 20px;
  }
`
const OgpContent = ({ release }: OgpProps) => (
  <html>
    <head>
      <style>{globalStyles}</style>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css"
      ></link>
    </head>
    <body>
      <main
        style={{
          padding: '64px',
          display: 'flex',
          background: '#112b33',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: '240px',
            marginLeft: '30px',
          }}
        >
          <img
            src={release.user.image}
            alt={release.user.name}
            style={{
              width: '128px',
              height: '128px',
              borderRadius: '50%',
              border: '3px solid #8a8fa3',
            }}
          />
          <span
            style={{
              marginTop: '20px',
              textTransform: 'uppercase',
              color: '#d9e0eb',
              fontSize: '1.4rem',
            }}
          >
            New Release
          </span>
          <span
            style={{
              marginTop: '2px',
              fontWeight: 'bold',
              fontSize: '2.2rem',
              color: '#58a6ff',
            }}
          >
            v{release.version}
          </span>
        </div>
        <div
          style={{
            marginLeft: '16px',
            padding: '24px',
            background: '#fafafa',
            borderRadius: '8px',
          }}
        >
          <ReleaseContent content={release.content}></ReleaseContent>
        </div>
      </main>
    </body>
  </html>
)

export type OgpProps = {
  release: Release
}

export const GetMarkUp = (props: OgpProps) => ReactDOM.renderToStaticMarkup(<OgpContent {...props} />)
