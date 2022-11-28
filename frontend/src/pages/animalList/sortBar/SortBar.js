import style from "./SortBar.module.css"
import Button from "@mui/material/Button"
import { useState } from "react"
function SortBar(props) {
  const changeSort = (event) => {
    props.changeSort(event.target.innerText)
    props.changePage(1)
    setChoice(event.target.innerText)
  }

  const [choice, setChoice] = useState("전체")

  return (
    <div className={style.sortBar}>
      <div className={style.sortBar_setting}>
        <div>
          <Button
            // className={style.button}
            sx={{
              fontSize: "18px",
              width: "8rem",
              fontWeight: "bold",
              color : "white",
            }}
            variant={choice === "전체" ? "contained" : "text"}
            onClick={changeSort}
          >
            전체
          </Button>
        </div>
        <div>
          <Button
            // className={style.button}
            sx={{ fontSize: "20px", width: "8rem", fontWeight: "bold", color : "white" }}
            variant={choice === "위급" ? "contained" : "text"}
            onClick={changeSort}
          >
            위급
          </Button>
        </div>
        <div>
          <Button
            // className={style.button}
            sx={{ fontSize: "20px", width: "8rem", fontWeight: "bold", color : "white" }}
            variant={choice === "위기" ? "contained" : "text"}
            onClick={changeSort}
          >
            위기
          </Button>
        </div>
        <div>
          <Button
            // className={style.button}
            sx={{ fontSize: "20px", width: "8rem", fontWeight: "bold", color : "white" }}
            variant={choice === "취약" ? "contained" : "text"}
            onClick={changeSort}
          >
            취약
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SortBar
