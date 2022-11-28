import { useState, useEffect } from "react"
import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import styles from "./SaleCard.module.css"
import { width } from "@mui/system"
import Modal from "components/modal/Modal"
import NFTPurchase from "../nftpurchase/NFTPurchase"
import { Cookies } from "react-cookie"

export default function SaleCard(props) {
  const cookies = new Cookies()
  const [isMine, setIsMine] = useState(false)
  //NFT data 로 받아온 값에서 필요한 것은 토큰 id로 부터 얻어와서 처리해야할 것
  //NFTdata 구성
  // {
  //  itemId: int,
  //  itemTitle: String
  //  itemPrice: double,
  //  itemTokenId: String,
  // animalKoreanName: String,
  // }
  const saleData = props.SaleData
  //console.log(saleData)
  //그 외 데이터는NFT에서 가져와야할 것
  const saleStartTime = new Date(props.SaleData.saleStartTime)
  const saleEndTime = new Date(props.SaleData.saleEndTime)

  const [modalOpen, setModalOpen] = useState(false)
  const openModal = () => {
    if (saleData.saleSellerAddress === cookies.get("id")) setIsMine(true)
    else setIsMine(false)
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <div>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: 3,
        }}
        onClick={openModal}
      >
        <CardMedia
          sx={{ boxShadow: 3 }}
          component="img"
          // sx={{
          //   // 16:9
          //   pt: '56.25%',
          // }}
          //image="https://source.unsplash.com/random"
          image={saleData.itemImgUrl}
          alt="animalImg"
        />
        <CardContent sx={{ boxShadow: "1" }} className={styles.cardContent}>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: 900,
            }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {saleData.animalKoreanName}
          </Typography>
          <div>
            <Typography variant="body2" color="text.secondary">
              판매기간 :
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {saleStartTime.toLocaleString().split("오")[0]} ~{" "}
              {saleEndTime.toLocaleString().split("오")[0]}
            </Typography>

            <Typography sx={{ textAlign: "end", paddingTop: "1rem" }}>
              {saleData.salePrice} ETH
            </Typography>
          </div>
        </CardContent>
      </Card>
      <Modal
        open={modalOpen}
        close={closeModal}
        header={isMine ? "NFT 판매 취소하기" : "NFT 구매하기"}
      >
        <NFTPurchase
          saleId={saleData.saleId}
          isMine={isMine}
          closeModal={closeModal}
        />
      </Modal>
    </div>
  )
}
