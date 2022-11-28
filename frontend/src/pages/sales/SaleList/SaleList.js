import * as React from "react"
import { Grid } from "@mui/material"
import SaleCard from "./SaleCard"
import { useState } from "react"
import { Pagination } from "@mui/material"
import usePagination from "components/pagination/Pagination"
import styles from "./SaleList.module.css"
import api from "api/api.js"

export default function SaleList(props) {
  //allData는 aixos 에서 가져올 것
  const [allData, setAllData] = React.useState([])
  const [realData, setRealData] = React.useState([])
  //페이징 처리
  const [page, setPage] = useState(1) // 처음 페이지는 1이다.
  const PER_PAGE = 8
  const count = Math.ceil(realData.length / PER_PAGE)
  const data = usePagination(realData, PER_PAGE)

  //props.animalName 이 '전체보기'면 전체 리스트 동물의
  //한글이름이면 그 이름에 맞게 필터링해서 NFT 리스트
  //useEffect 안에서 data 필터링 필요
  //data 구성
  // {
  //  itemId: int,
  //  itemTitle: String
  //  itemPrice: double,
  //  itemTokenId: String,
  // animalKoreanName: String,
  // }
  //이대로 NFT data가 제대로 갱신되는지는 후에 해볼 영역
  React.useEffect(() => {
    //console.log(props.animalName)

    // api.item.getItem("ALL").then((response) => {
    //   //console.log(response.list)
    //   setAllData([response])
    //   //console.log(response)
    //   if (props.animalName !== "전체보기" && allData.length !== 0) {
    //     setAllData(allData.filter(
    //       (data) => data.animalKoreanName === props.animalName,
    //     ))
    //   }
    // })
    const getNFTList = async () => {
      const result = await api.sale.getSaleList()
      //console.log(result)
      setAllData(result.list)
    }

    getNFTList()
    //console.log("한번만")
  }, [])

  const handleChange = (e, p) => {
    setPage(p)
    data.jump(p)
  }

  React.useEffect(() => {
    data.setNewData(realData)
    return () => {}
  }, [realData, data])

  React.useEffect(() => {
    let newList = []
    if (props.animalName !== "전체보기" && allData.length !== 0) {
      newList = allData.filter(
        (data) => data.animalKoreanName === props.animalName,
      )
    } else {
      newList = allData
    }
    setRealData(newList)
  }, [props.animalName, allData])

  return (
    <div className={styles.outDiv}>
      <Grid container spacing={2}>
        {data.currentData().map((data, idx) => (
          <Grid item key={idx} xs={12} sm={6} md={3}>
            <SaleCard SaleData={data}></SaleCard>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={count}
        page={page}
        color="primary"
        size="large"
        sx={{
          margin: 2,
          display: "inline-block",
        }}
        onChange={handleChange}
      />
    </div>
  )
}
