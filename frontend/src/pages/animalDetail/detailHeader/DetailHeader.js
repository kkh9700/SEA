import * as React from "react"
import styles from "./DetailHeader.module.css"
function DetailHeader(props) {
  return (
    <div className={styles.DetailHeader}>
      <img
        className={styles.LogoImg}
        src={require("../../../resources/img/logo/WhaleLogo.png")}
        alt="logo"
      ></img>
    </div>
  )
}

export default DetailHeader
