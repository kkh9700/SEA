import { Pagination as AnimalListPagination } from "@mui/material"
import styles from "./Pagination.module.css"
const Pagination = (props) => {
  const changePage = (event, index) => {
    props.changePage(index)
  }

  const number = !(props.number % 4)
    ? parseInt(props.number / 4)
    : parseInt(props.number / 4) + 1

  return (
    <div className={styles.Pagination}>
      {props.number ? (
        <AnimalListPagination
          onChange={changePage}
          count={number}
          color="secondary"
          page={props.pageNumber}
        ></AnimalListPagination>
      ) : null}
    </div>
  )
}

export default Pagination
