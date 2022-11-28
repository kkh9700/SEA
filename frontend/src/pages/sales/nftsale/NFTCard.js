import * as React from "react"
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material"
import { useState, useEffect } from "react"
import styles from "./NFTCard.module.css"
import Swal from "sweetalert2"

export default function NFTCard(props) {
  const [cardStyle, setCardStyle] = useState(styles.Card)

  const NFTdata = {
    img: props.NFTData.itemImgUrl,
    endangered: props.NFTData.animalEndangeredLevel,
    animalName: props.NFTData.animalKoreanName,
    NFTaddress: props.NFTData.itemTokenId,
    itemId: props.NFTData.itemId,
  }

  function clicked() {
    // props.setSelectImg(NFTdata.img)
    // console.log(props.NFTData.itemId)
    props.getNFTdata(NFTdata)
  }

  useEffect(() => {
    if (props.selectImg === NFTdata.img) setCardStyle(styles.selectedCard)
    else setCardStyle(styles.Card)
  }, [props.selectImg])

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: 3,
      }}
      className={cardStyle}
      onClick={clicked}
    >
      <CardActionArea sx={{ height: "100%" }}>
        <CardMedia
          sx={{ boxShadow: 3 }}
          component="img"
          image={NFTdata.img}
          alt="animalImg"
        />
        <CardContent
          sx={{
            flex: "1 1 auto",
            boxShadow: "1",
            height: "1rem",
          }}
          className={styles.cardContent}
        >
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: "bold",
              mr: "2.5rem",
              lineHeight: "0rem",
            }}
            component="div"
          >
            {NFTdata.animalName}
          </Typography>
          <Typography
            sx={{ fontSize: 20, fontWeight: "bold", lineHeight: "0rem" }}
            component="div"
            style={
              NFTdata.endangered === 1
                ? { color: "red" }
                : NFTdata.endangered === 2
                ? { color: "blue" }
                : { color: "green" }
            }
          >
            {NFTdata.endangered === 1
              ? "위급"
              : NFTdata.endangered === 2
              ? "위기"
              : "취약"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
