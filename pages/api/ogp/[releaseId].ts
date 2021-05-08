import { findRelease } from '@/packages/releases/releaseQuery'
import { NextApiRequest, NextApiResponse } from 'next'
// @see https://github.com/microsoft/playwright/issues/5862
import * as playwright from 'playwright-aws-lambda'
import { GetMarkUp } from '../../../components/ogp/OgpContent'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Releaseオブジェクトの取得
  const release = await findRelease({ id: `${req.query.releaseId}` })

  // サイズの設定
  const viewport = { width: 1200, height: 630 }

  // ブラウザインスタンスの生成
  const browser = await playwright.launchChromium()
  const page = await browser.newPage({ viewport })

  // HTMLの生成
  const markup = GetMarkUp({ release })
  const html = `<!doctype html>${markup}`

  // HTMLをセットして、ページの読み込み完了を待つ
  await page.setContent(html, { waitUntil: 'domcontentloaded' })

  // スクリーンショットを取得する
  const image = await page.screenshot({ type: 'png' })
  await browser.close()

  // Vercel Edge Networkのキャッシュを利用するための設定
  res.setHeader('Cache-Control', 'maxage=60, s-maxage=31536000, stale-while-revalidate=1')

  // Content Type を設定
  res.setHeader('Content-Type', 'image/png')

  // レスポンスを返す
  res.end(image)
}
