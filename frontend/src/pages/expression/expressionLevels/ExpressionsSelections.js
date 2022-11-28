import Grid from "@mui/material/Unstable_Grid2/Grid2"
import style from "./ExpressionsSelections.module.css"
import { useState } from "react"

const ExpressionSelections = (props) => {
  const question = props.data.question
  const selectionKeys = props.data.selectionKeys
  const selections = props.data.selections

  const addWord = (e) => {
    if (!takenWord) {
      setAlertWord("선택해 주셔야 합니다!")
      return
    }
    props.addWord(takenWord)
  }

  // 선택지들 클릭했을 때,
  const [takenWord, setTakenWord] = useState("")

  // 선택지를 클릭하지 않고 넘어가려 할 때
  const [alertWord, setAlertWord] = useState("")

  const changeTaken = (event) => {
    setTakenWord(event.target.innerText)
  }

  return (
    <div className={style.expressionText}>
      <div className={style.expressionHeader}>
        {question.length > 20 ? <h2>{question}</h2> : null}
        {question.length <= 20 ? <h1>{question}</h1> : null}
      </div>
      <div className={style.alertDiv}>{alertWord}</div>
      <div className={style.imageDiv}>
        <Grid container spacing={5} justifyContent="center" alignItems="center">
          {selectionKeys.map((selection, index) => (
            <Grid xs="auto" key={index}>
              <input
                className={style.selectionInput}
                id={selection}
                type="radio"
                name="select"
              />
              <label
                className={style.label}
                onClick={changeTaken}
                htmlFor={selection}
              >
                {selection}
              </label>
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={style.buttonDiv}>
        <button className={style.nextButton} onClick={addWord}>
          다음으로
        </button>
      </div>
    </div>
  )
}

export default ExpressionSelections
