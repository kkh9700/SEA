import * as React from "react"
import CarouselImages from "./carousel/CarouselImages"
import DetailHeader from "./detailHeader/DetailHeader"
import DetailInfo from "./detailInfo/DetailInfo"
import styles from "./AnimalDetailPage.module.css"
import { useLocation } from "react-router-dom"
import api from "api/api.js"
import { useState, useEffect } from "react"

const AnimalDetail = (props) => {
  const location = useLocation()
  const animalId = location.state.animalId
  //console.log(location.state.animalId)

  //동물 정보는 props에서 받은 선택한 정보던지 axios로 받던지 추후 상호작용
  // const animalInfo = {
  //   korName: "벵갈 호랑이",
  //   engName: "bengal tiger",
  //   description:
  //     "인도와 그 주변국들에 서식하고 있는 호랑이의 아종. '벵갈 호랑이, 인도 호랑이'라고도 한다. 시베리아호랑이와 달리 고동색 줄무늬에 황색 털가죽이 조금 더 짙은색이다. 몸 안쪽 부위는 하얀색이며, 꼬리는 검은 고리가 끼어있는 주황색이다. 방글라데시와 인도의 습지에는 현재 약 5,000 마리의 벵갈 호랑이가 살고 있습니다. 그러나 기후변화로 인한 해수면 상승으로 인해 벵갈호랑이의 서식처가 물에 잠길 위험에 처했습니다. 유엔은 2070년이 되면 벵갈호랑이가 살 수 있는 습지가 모두 물에 잠겨 완전히 멸종할 것이라고 경고했습니다.",
  //   maxNFT: 100,
  //   nowNFT: 40,
  //   iucn: "취약 등급 1급",
  //   species: "포유류",
  // }
  const [animalInfo, setAnimalInfo] = useState({})
  useEffect(() => {
    api.animal.getAnimalDetail(animalId).then((res) => {
      //console.log(res.dto)
      setAnimalInfo(res.dto)
      //console.log(animalList)
    })
  }, [])
  return (
    <div className={styles.AnimalDetail}>
      {/* <DetailHeader></DetailHeader> */}
      <CarouselImages animalImgs={animalInfo.animalImg}></CarouselImages>
      <DetailInfo animalInfo={animalInfo}></DetailInfo>
    </div>
  )
}

export default AnimalDetail
