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
    Segoe UI Emoji, NotoColorEmoji;
  }

  .markdown-body.markdown-body {
    font-family: 'M PLUS Rounded 1c', Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, NotoColorEmoji;
  }
`
const OgpContent = ({ release, font, emojiFont }: OgpProps) => (
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
        @font-face {
          font-family: 'NotoColorEmoji';
          src: url(data:font/ttf;charset=utf-8;base64,${emojiFont}) format('truetype');
        }
      `,
        }}
      />
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
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
  font: string
  emojiFont: string
}

export const GetMarkUp = (props: { release: Release }) => {
  const fontPath = path.resolve(process.cwd(), './assets/MPLUSRounded1c-Bold.ttf')
  const font = fs.readFileSync(fontPath, { encoding: 'base64' })
  const emojiFontPath = path.resolve(process.cwd(), './assets/NotoColorEmoji.ttf')
  const emojiFont = fs.readFileSync(emojiFontPath, { encoding: 'base64' })
  const element = React.createElement(OgpContent, { font, release: props.release, emojiFont })
  return ReactDOM.renderToStaticMarkup(element)
}
