import React from "react"
import { useEffect, useState } from "react"
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import CameraIcon from "@mui/icons-material/PhotoCamera"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Footer from "../../components/footer/Footer"
import { Routes, Route, Navigate } from "react-router-dom"
import ExpressionPage from "../expression/ExpressionPage"
import Navbar from "../../components/navbar/Navbar"
import MyPage from "../mypage/MyPage"
import AnimalListPage from "../animalList/AnimalList"
import AnimalList from "../animalList/AnimalList"
import Modal from "../../components/modal/Modal"
import NFTsale from "../sales/nftsale/NFTsale"
import NFTpurchase from "../sales/nftpurchase/NFTPurchase"
import NFTTest from "./NFTest"
import cookies from "react-cookies"
import { ethers } from "ethers"
import style from "./Mainpage.module.css"
import { useNavigate, useLocation } from "react-router-dom"
import api from "../../api/api"
import Swal from "sweetalert2"

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const theme = createTheme()

export default function Mainpage() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  const [modalOpen, setModalOpen] = useState(false)
  const openModal = () => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }

  // console.log(cookies.load('id'));
  const navigate = useNavigate()
  const goToExpression = async () => {
    const testResult = await api.user.getExpressionsResult()
    if (!testResult.length) {
      Swal.fire({
        icon: "info",
        title: "??? ??????????????? ??????!",
        html: "???????????? ??????<br>????????? ????????? ???????????????!",
        confirmButtonColor: "#1787A7",
        background: "#D3E0EA",
      }).then(() => {
        navigate("/main/express")
      })
    } else {
      Swal.fire({
        icon: "info",
        title: "?????? ???????????? ??????!",
        text: "?????? ????????? ???????????? ?????? ?????????",
        confirmButtonColor: "#1787A7",
        background: "#D3E0EA",
      }).then(() => {
        navigate("/main/animalList")
      })
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
        </Toolbar>
      </AppBar> */}
      <main>
        {/* Hero unit */}
        <Container
          sx={{
            mt: 15,
            minHeight: "50rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* ?????? ????????? ????????? ??? */}
          <div className={style.imageBox}>
            <img
              className={style.mainImage}
              src="/images/logo/main1.png"
              alt="???????????????"
            />
          </div>
          {/* ?????? ?????? + ????????? ????????? Div */}
          <div className={style.mainMiddle}>
            <div className={style.mainMiddleColumn}>
              <img
                className={style.mainImage}
                src="/images/logo/main3.png"
                alt="???????????????"
              />
            </div>
            <div className={style.mainMiddleColumn}>
              <div className={style.mainText}>
                ?????? 16?????? ???????????? <br />
                ????????? ????????? ???????????? ????????????
              </div>
              <div className={style.mainText}>
                <button onClick={goToExpression}>????????????</button>
              </div>
            </div>
            <div className={style.mainMiddleColumn}>
              <img
                className={style.mainImage}
                src="/images/logo/main2.png"
                alt="???????????????"
              />
            </div>
          </div>
          {/* <Button variant="contained">???????????? ??????</Button> */}
        </Container>
        {/* <Container sx={{ py: 8 }} maxWidth="md">
          ????????? ???????????? ????????? <br />
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      ????????? / ????????????
                    </Typography>
                    <Typography>?????? ??????????????? ????????? ??????..</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">?????? ?????????/?????? ??????</Button>
                    <Button size="small">????????????</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container> */}
      </main>
    </ThemeProvider>
  )
}
