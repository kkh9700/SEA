import styles from "./ExpressionText.module.css"
import { useState, useEffect } from "react"
const ExpressionText = (props) => {
  // const selectedWordList = props.selectedWordList
  const goToNext = props.goToNext
  let title = props.data.title
  const [selectedWordList, setSelectedWordList] = useState(
    props.selectedWordList
  )
  const [level, setLevel] = useState(props.data.level)
  const [text, setText] = useState(props.data.text)
  useEffect(() => {
    if (level === 4) {
      let replacedText = text.replace("~", selectedWordList.at(-1))
      setText(replacedText)
    } else if (level === 6) {
      let replacedText = text.replace("~", selectedWordList.at(-1).slice(0, -2))
      setText(replacedText)
    } else if (level === 8) {
      let replacedText = text.replace("~", selectedWordList.at(-1).slice(0, -2))
      setText(replacedText)
    }
  }, [level, text, selectedWordList])

  return (
    <div className={styles.expressionText}>
      <div className={styles.expressionHeader}>
        <h1>{title}</h1>
      </div>
      <div className={styles.imageDiv}>
        <img
          className={styles.image}
          src={`/images/expression/${level}.png`}
          alt="사진"
        />
      </div>
      <div className={styles.textDiv}>
        <div className={styles.text}>{text}</div>
        <button onClick={goToNext} className={styles.nextButton}>
          다음
        </button>
      </div>
    </div>
  )
}

export default ExpressionText
