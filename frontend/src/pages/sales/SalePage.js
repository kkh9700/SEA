import * as React from "react"
import SaleList from "./SaleList/SaleList"
import Menu from "./MenuBar/Menu"
import styles from "./SalePage.module.css"
import { useState } from "react"

export default function SalePage() {
  const [animalName, setAnimalName] = useState("전체보기")
  return (
    <div className={styles.outDiv}>
      <Menu setAnimalName={setAnimalName} />
      <SaleList animalName={animalName} />
    </div>
  )
}
