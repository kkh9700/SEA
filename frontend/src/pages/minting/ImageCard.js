import { Card, CardContent, CardMedia, CardActionArea } from "@mui/material"
import styles from "./ImageCard.module.css"
import { useState, useEffect } from "react"
import { height } from "@mui/system"
export default function ImageCard(props) {
  const [cardStyle, setCardStyle] = useState(styles.Card)
  function clicked() {
    props.setSelectImg(props.imageLink)
  }
  useEffect(() => {
    if (props.selectImg === props.imageLink) setCardStyle(styles.selectedCard)
    else setCardStyle(styles.Card)
  }, [props.selectImg])

  return (
    <Card className={cardStyle} onClick={clicked}>
      <CardActionArea sx={{ height: "100%" }}>
        <CardMedia
          component="img"
          // sx={{
          //   // 16:9
          //   pt: "56.25%",
          // }}
          //image="https://source.unsplash.com/random"
          image={props.imageLink}
          alt="animalImg"
        />
      </CardActionArea>
    </Card>
  )
}
