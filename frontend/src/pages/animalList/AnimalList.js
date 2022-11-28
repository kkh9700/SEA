import style from "./AnimalList.module.css"
import AnimalItems from "./animalItems/AnimalItems"
import SortBar from "./sortBar/SortBar"
import Pagination from "./pagination/Pagination"
import { useEffect, useState,useCallback } from "react"
import api from "api/api.js"
function AnimalList() {
  const [animalList, setAnimalList] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [sortedAnimalList, setSortedAnimalList] = useState(animalList)
  const [sort,setSort]=useState('전체')
  // 페이지 바꿔주는 함수
  const pageListner = function (data) {
    setPageNumber(data)
  }

  // 정렬 바꿔주는 함수
  // const changeSort = function (data) {
  //   const tempList = []
  //   if (data === "전체") {
  //     setSortedAnimalList(animalList)
  //   } else {
  //     for (const i of animalList) {
  //       let level = 0
  //       if (data === "위급") {
  //         level = 1
  //       } else if (data === "위기") {
  //         level = 2
  //       } else {
  //         level = 3
  //       }
  //       if (i.animalEndangeredLevel === level) {
  //         tempList.push(i)
  //       }
  //     }
  //     setSortedAnimalList(tempList)
  //   }
  // }

  const changeSort = useCallback(data=>{
    const tempList = []
    if (data === "전체") {
      setSortedAnimalList(animalList)
    } else {
      for (const i of animalList) {
        let level = 0
        if (data === "위급") {
          level = 1
        } else if (data === "위기") {
          level = 2
        } else {
          level = 3
        }
        if (i.animalEndangeredLevel === level) {
          tempList.push(i)
        }
      }
      setSortedAnimalList(tempList)
    }
  },[animalList]) 

  // 페이지 넘버에 맞추어서 보여줄 페이지를 잘라준다.
  const showedAnimalList = sortedAnimalList.slice(
    (pageNumber - 1) * 4,
    pageNumber * 4,
  )

  //api에서 데이터 가져오기
  useEffect(() => {
    // api.animal.getAnimalList().then((res) => {
    //   //console.log(res.list.content)
    //   setAnimalList(res.list.content)
    //   //console.log(animalList)
    //   //setSort('전체')
    //   changeSort(sort)
    // })
    const getAnimalList= async ()=>{
      //console.log(cookies.get("accessToken"))
      const res=await api.animal.getAnimalList();
      //console.log(res.list);
      if(JSON.stringify(res.list.content)!==JSON.stringify(animalList))
        setAnimalList(res.list.content)
      changeSort(sort);
    }
    getAnimalList();
  }, [sort,changeSort,animalList])


  return (
    <div className={style.animallist}>
      <SortBar changeSort={setSort} changePage={pageListner}/>
      <AnimalItems animalList={showedAnimalList} />
      <Pagination changePage={pageListner} pageNumber={pageNumber} number={sortedAnimalList.length} />
    </div>
  )
}

export default AnimalList
