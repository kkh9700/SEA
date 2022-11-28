import * as React from "react"
import { Grid } from "@mui/material"
import NFTCard from "./NFTCard"
import { useState, useEffect } from "react"
import { Pagination } from "@mui/material"
import usePagination from "components/pagination/Pagination"
import styles from "./NFTList.module.css"
import api from "api/api"

export default function NFTList() {
  //유저 주소에 따른 NFT List 가져오기
  //alldata에 유저에 따른 NFT 받기
  const [allData, setAllData] = useState([])

  const [page, setPage] = useState(1) // 처음 페이지는 1이다.
  const PER_PAGE = 8
  const count = Math.ceil(allData.length / PER_PAGE)
  const data = usePagination(allData, PER_PAGE)

  const handleChange = (e, p) => {
    setPage(p)
    data.jump(p)
  }

  //
  useEffect(() => {
    const getNFTList = async () => {
      const result = await api.item.getItem("User")
      //console.log(result.list)
      setAllData(result.list)
    }

    getNFTList()
  }, [])

  useEffect(() => {
    data.setNewData(allData)
    return () => {}
  }, [allData, data])
  return (
    <div className={styles.outDiv}>
      <Grid container spacing={3}>
        {data.currentData().map((data, idx) => (
          <Grid item key={idx} xs={12} sm={6} md={3}>
            <NFTCard NFTData={data}></NFTCard>
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
