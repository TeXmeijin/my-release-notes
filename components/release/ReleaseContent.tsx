import {
  MasterReleaseContents,
  ReleaseContent as ReleaseContentType,
  ReleaseContentHeading,
} from '@/types/release/type'
import ReactMarkdown from 'react-markdown'
import styles from '@/styles/components/ReleaseContent.module.scss'

type Props = {
  content: ReleaseContentType
}

export const ReleaseContent = (props: Props) => {
  return (
    <>
      {Object.keys(props.content).map((key: ReleaseContentHeading) => {
        return (
          <div className={styles.contentItem} key={key}>
            <h3 className={styles.heading}>{MasterReleaseContents[key]}</h3>
            <ReactMarkdown
              className="markdown-body"
              components={{
                h1: 'h3',
                h2: 'h3',
                h3: 'h3',
              }}
              children={props.content[key]}
            ></ReactMarkdown>
          </div>
        )
      })}
    </>
  )
}
