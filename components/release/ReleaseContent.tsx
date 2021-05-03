import {
  MasterReleaseContents,
  ReleaseContent as ReleaseContentType,
  ReleaseContentHeading,
} from '@/types/release/type'
import ReactMarkdown from 'react-markdown'
import styles from '@/styles/components/ReleaseContent.module.scss'
import { PropsWithChildren } from 'react'

type Props = {
  content: ReleaseContentType
}

const ReleaseContentHeader = (props: PropsWithChildren<unknown>) => {
  return <h3 className={styles.subHeading} {...props}></h3>
}

export const ReleaseContent = (props: Props) => {
  return (
    <>
      {Object.keys(props.content).map((key: ReleaseContentHeading) => {
        return (
          <div className={styles.contentItem} key={key}>
            <h3 className={styles.heading}>{MasterReleaseContents[key]}</h3>
            <ReactMarkdown
              components={{
                h1: ReleaseContentHeader,
                h2: ReleaseContentHeader,
                h3: ReleaseContentHeader,
              }}
              children={props.content[key]}
            ></ReactMarkdown>
          </div>
        )
      })}
    </>
  )
}
