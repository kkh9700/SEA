import * as React from "react"
import { Grid } from "@mui/material"
import AnimalCard from "./AnimalCard"
import { useState, useEffect } from "react"
import { Pagination } from "@mui/material"
import UsePagination from "components/pagination/Pagination"
import styles from "./AnimalCollection.module.css"
import api from "api/api.js"

export default function AnimalCollection() {
  //동물 리스트 받아오기
  //동물 리스트 데이터에 NFT소유 여부(boolean) 넣어서 데이터 재가공 하기
  const [animalList, setAnimalList] = useState([])
  //내가 소유한 NFT리스트 받아오기
  const [NFTList, setNFTList] = useState([])
  // 반복 돌면서 {animalName, animalImage , haveNFT: false}
  // for (let index = 0; index < 30; index++) {
  //   const newItem = {
  //     animalImg: "https://source.unsplash.com/random",
  //     animalName: "여우",
  //     haveNFT: index % 2 === 1 ? true : false,
  //   }
  //   animalList.push(newItem)
  // }

  //내가 소유한 NFT리스트 받아오기
  //const NFTList = [] //axios 데이터 받아오기//useeffect?

  //NFT리스트 한번 반복하면서 동물리스트에서 소유한 동물은 True 없는 동물은 false //비교는 동물의 한국 이름으로 한다(animalKoreanName)
  //그렇게 해서 true false에 따라서 수집 못한 동물은 투명도 먹이고 뒤에 회색 배경 넣으면 될 것 같다.

  // NFT 리스트 데이터를 아직 더미데이터를 넣기에도 적절치 않기에 이부분은 아직 보류

  //페이지 처리
  const [page, setPage] = useState(1) // 처음 페이지는 1이다.
  const PER_PAGE = 8
  //const [count,setCount] = useState(Math.ceil(animalList.length / PER_PAGE))
  //const [data,setData] = useState(UsePagination(animalList, PER_PAGE))
  const count = Math.ceil(animalList.length / PER_PAGE)
  const data = UsePagination(animalList, PER_PAGE)

  const handleChange = (e, p) => {
    setPage(p)
    data.jump(p)
  }

  // const setPageOpt=()=>{
  //   setData(UsePagination(animalList, PER_PAGE))
  //   setCount(Math.ceil(animalList.length / PER_PAGE))
  // }
  useEffect(() => {
    const getAnimalCollection = async () => {
      //NFT 리스트 가져와서 소유 동물 표시
      let nftMap = new Map()
      const NFTRes = await api.item.getItem("User")
      //console.log(NFTRes.list)
      NFTRes.list.map((data, idx) => nftMap.set(data.animalKoreanName, true))
      //동물 리스트 가져오기
      const animalListRes = await api.animal.getAnimalList()
      //console.log(animalListRes.list.content)
      let animalL = []
      animalListRes.list.content.map((data, idx) =>
        animalL.push({
          animalName: data.animalKoreanName,
          animalImg: data.animalImg[0],
          animalId: data.animalId,
          haveNFT: nftMap.get(data.animalKoreanName) === true ? true : false,
        }),
      )
      setAnimalList(animalL)
      //  setPageOpt()
      //console.log(animalList)
    }
    getAnimalCollection()
  }, [])

  useEffect(() => {
    data.setNewData(animalList)
    return () => {}
  }, [animalList, data])
  //투명에 회색 배경 처리는 카드 내부에서 하자
  //이곳에선 동물 리스트만 띄우면 될 것 같다
  return (
    <div className={styles.outDiv}>
      <Grid container spacing={3}>
        {data.currentData().map((data, idx) => (
          <Grid item key={idx} xs={12} sm={6} md={3}>
            <AnimalCard
              animalImg={data.animalImg}
              animalName={data.animalName}
              haveNFT={data.haveNFT}
              animalId={data.animalId}
            />
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
