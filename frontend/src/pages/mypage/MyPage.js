import * as React from "react"
import MyPageInfo from "./MyPageInfo"
import MyPageTab from "./MyPageTab"
import styles from "./MyPage.module.css"
export default function MyPage() {
  return (
    <div className={styles.myPage}>
      <MyPageInfo></MyPageInfo>
      <MyPageTab></MyPageTab>
    </div>
  )
}
