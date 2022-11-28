import * as React from "react"
import Carousel from "react-material-ui-carousel"
//import { Paper, Button } from "@mui/material";
import styles from "./CarouselImages.module.css"
import { useState, useEffect } from "react"


function CarouselImages(props) {
  //실제론 동물 폴더 이름과 파일 번호를 제대로 지어줘야할 것
  const [items, setItems] = useState([])

  //제대로 props 전달 되면 이값으로 변경
  useEffect(() => {
    //console.log(props.animalImgs)
    //만약 아직 초기화 되지 않은 경우 map함수 동작하지 않으므로 undefined 검사 해주자
    if(props.animalImgs !== undefined)
      setItems(props.animalImgs)
    
  }, [props.animalImgs])

  return (
    <div className={styles.CarouselImagesBox}>
      <Carousel height={300} navButtonsAlwaysVisible={true}>
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </div>
  )
}
function Item(props) {
  return (
    <div>
      <img
        className={styles.AnimalImage}
        src={props.item}
        alt="Animal-Images"
      />
    </div>
  )
}

export default CarouselImages
