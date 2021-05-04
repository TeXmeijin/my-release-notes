import { Release } from '@/types/release/type'
import ReactDOM from 'react-dom/server'
import { ReleaseContent } from '../release/ReleaseContent'
import React from 'react'
import path from 'path'
import fs from 'fs'

const globalStyles = `
  html, body {
    height: 100%;
    display: grid;
    padding: 0;
    margin: 0;
    font-family: 'M PLUS Rounded 1c', Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji;
  }

  body {
    width: 800px;
    height: 420px;
    transform: scale(1.5);
    transform-origin: left top;
  }

  .markdown-body.markdown-body {
    font-family: 'M PLUS Rounded 1c', Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji;
  }
`
const OgpContent = ({ release, font }: OgpProps) => (
  <html>
    <head>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css"
      ></link>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @font-face {
          font-family: 'M PLUS Rounded 1c';
          src: url(data:font/ttf;charset=utf-8;base64,${font}) format('truetype');
        }
      `,
        }}
      />
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
    </head>
    <body>
      <main
        style={{
          padding: '42px',
          display: 'flex',
          background: '#112b33',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: '80px',
            marginLeft: '10px',
          }}
        >
          <img
            src={release.user.image}
            alt={release.user.name}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              border: '2px solid #8a8fa3',
            }}
          />
          <span
            style={{
              marginTop: '12px',
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
            padding: '12px 24px',
            background: '#fafafa',
            borderRadius: '8px',
            flex: 1,
            maxHeight: '340px',
            position: 'relative',
          }}
        >
          <ReleaseContent content={release.content}></ReleaseContent>
          <div
            style={{
              position: 'absolute',
              width: 'calc(100% - 48px)',
              height: '90px',
              bottom: '8px',
              background: 'linear-gradient(rgba(255, 255, 255, 0.5), #fafafa);',
            }}
          ></div>
        </div>
      </main>
    </body>
  </html>
)

export type OgpProps = {
  release: Release
  font: string
}

export const GetMarkUp = (props: { release: Release }) => {
  const fontPath = path.resolve(process.cwd(), './assets/MPLUSRounded1c-Bold.ttf')
  const font = fs.readFileSync(fontPath, { encoding: 'base64' })
  const element = React.createElement(OgpContent, { font, release: props.release })
  return ReactDOM.renderToStaticMarkup(element)
}
