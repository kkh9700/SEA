import styles from "./ExpressionStart.module.css"
const ExpressionStart = (props) => {
  const goToNext = props.goToNext
  return (
    <div className={styles.expressionStart}>
      <div className={styles.expressionHeader}>
        <h1>여행의 시작</h1>
      </div>
      <div className={styles.imageDiv}>
        <img
          className={styles.image}
          src="/images/expression/start.jpg"
          alt="사진"
        />
      </div>
      <div className={styles.textDiv}>
        <div className={styles.text}>
          당신은 지금 자신이 누군지 발견하기 위한 첫 걸음을 디뎠습니다.
          <br />
          <br />
          시작해 볼까요?
        </div>
        <button onClick={goToNext} className={styles.startButton}>
          시작하기
        </button>
      </div>
    </div>
  )
}

export default ExpressionStart
