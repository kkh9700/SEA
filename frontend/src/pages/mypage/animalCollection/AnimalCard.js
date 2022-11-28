import * as React from "react"
import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import styles from "./AnimalCard.module.css"

export default function AnimalCard(props) {
  //정보 props로 받자
  //동물 이름, 이미지, nft 수집 여부 3개면 된다
  const navigate = useNavigate()

  const animalData = {
    ...props,
  }

  //console.log(animalData)
  //nft 수집 여부에 따라서 다른 CSS 먹이자
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: 3,
      }}
      className={styles.card}
      onClick={() =>
        navigate("/main/animalDetail", {
          state: { animalId: animalData.animalId },
        })
      }
    >
      <CardMedia
        className={
          animalData.haveNFT === true ? styles.haveNFTImg : styles.haveNotNFTImg
        }
        sx={{ boxShadow: 3 }}
        component="img"
        // sx={{
        //   // 16:9
        //   pt: '56.25%',
        // }}
        //image="https://source.unsplash.com/random"
        image={animalData.animalImg}
        alt="animalImg"
      />
      <CardContent
        className={
          animalData.haveNFT === true
            ? styles.cardContent
            : styles.cardContentNotNFT
        }
      >
        <Typography
          sx={{ fontSize: 20, fontWeight: "bold", lineHeight: "1rem" }}
          component="div"
        >
          {animalData.animalName}
        </Typography>
      </CardContent>
    </Card>
  )
}
