import style from "./loadingSpinner.module.css"
const LoadingSpinner = (props) => {
  let text = "Loading..."

  if (props.text !== undefined) {
    text = props.text
  }

  return (
    <div className={style.wrapper}>
      <div>
        <img
          className={style.loadingGif}
          src="/images/logo/loading.gif"
          alt="로딩스피너"
        />
      </div>
      <div className={style.loadingText}>{text}</div>
    </div>
  )
}

export default LoadingSpinner
