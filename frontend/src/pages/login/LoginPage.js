import React, { useEffect, useState } from "react"
import { Button, Paper, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { ethers } from "ethers"
import api from "api/api"
import coin from "../login/coin.png"
import loading from "../login/loading.gif"
import sealogo3 from "../login/sealogo3.png"
import logo from "../../components/footer/sea.png"
import "./Login.css"
import Web3 from "web3"
import Swal from "sweetalert2"

const LoginPage = () => {
  const [haveMetamask, sethaveMetamask] = useState(true)
  const [isConnected, setIsConnected] = useState(false)

  const [errorMessage, setErrorMessage] = useState(null)
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState(null)
  const [cookies, setCookie] = useCookies()
  const navigate = useNavigate()
  // const web3 = new Web3(window.web3.currentProvider);
  const web3 = new Web3(window.ethereum)

  const getCurrentAccount = async () => {
    try {
      const currentAccounts = await web3.eth.getAccounts()
      console.log(currentAccounts[0])
      const balance = await web3.eth.getBalance(currentAccounts[0])
      console.log(balance)
      console.log(web3)
      return currentAccounts[0]
    } catch {
      console.log("err")
    }
  }
  const showNFTInfo = () => {
    Swal.fire({
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#3085d6",
      title: "METAMASK?",
      text: "메타마스크는 가상 화폐 거래를 좀 더 편하게 가능하게 해주는 지갑 역할을 하는 크롬 확장 프로그램입니다!",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "coin을 얻으려면?",
      cancelButtonText: "metamask 사용법?",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          width: 1000,
          title: "GoerilETH 받기 - 로그인 필요",
          html: `
      <b>1.<a href="https://goerlifaucet.com/" target="_blank">https://goerlifaucet.com/</a></b><br><br>
      <b>2.메타마스크에서는 GeorilETH과 연결할 수 있습니다.</b><br><br>
      <b>3.네트워크를 Georil 테스트 네트워크로 전환합니다.</b><br><br>
      <b>4.해당 항목이 보이지 않을 시 설정-고급-테스트네트워크 보기 항목을 활성화하여 확인이 가능합니다.</b><br><br>
      <b>5.잔고가 GoerilETH과 연결된 것을 확인한 뒤 위의 링크로 들어갑니다.</b><br><br>
      <b>6.본인의 지갑주소('0x......')를 입력하여 0.1GoerilETH를 지급받을 수 있습니다.</b>`,
          confirmButtonText: "Next",
        }).then(() => {
          return Swal.fire({
            width: 800,
            title: "GoerilETH 받기 - 로그인 불필요",
            html: `
            <b>1. <a href="https://goerli-faucet.pk910.de/" target="_blank">https://goerli-faucet.pk910.de/</a></b><br><br>
          <b>2.해당 링크에 본인의 지갑주소를 입력한 뒤 채굴을 시작할 수 있습니다.</b><br><br>
          <b>3.원하는 시간 동안 채굴하고 보상으로 GoerilETH를 제공받을 수 있습니다.</b>`,
            confirmButtonText: "Next",
          })
        })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          width: 800,
          title: "메타마스크 설치",
          html: `
          <b>1.메타마스크를 설치하기 위해 <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko" target="_blank">크롬 웹스토어</a>에 접속합니다.</b><br><br>
          <b>2.왼쪽 상단의 스토어 검색에서 Metamask를 검색합니다.</b><br><br>
          <b>3.메타마스크 페이지에서 'Chrome에 추가' 버튼을 눌러주면 설치가 완료됩니다.</b>`,
          confirmButtonText: "Next",
        }).then(() => {
          return Swal.fire({
            width: 800,
            title: "지갑 생성",
            html: `
          <b>1.첫 화면에서 시작하기를 누릅니다.</b><br><br>
          <b>2.다음 화면에서 지갑 생성 버튼을 누릅니다.</b><br><br>
          <b>3.가입 진행 중에 생성되는 비밀 복구 구문을 안전한 장소 및 경로에 보관합니다.</b><br><br>
          <b>4.가입 진행을 마치면 지갑이 생성됩니다.</b>`,
            confirmButtonText: "Next",
          })
        })
      }
    })
  }
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", accountsChanged)
      window.ethereum.on("chainChanged", chainChanged)
      getCurrentAccount()
    }

    const { ethereum } = window
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false)
      }
      sethaveMetamask(true)
    }
    checkMetamaskAvailability()
  }, [])

  const connectHandler = async () => {
    if (window.ethereum) {
      try {
        const res = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        await accountsChanged(res[0])
        setIsConnected(true)
        api.user.login(res[0])
      } catch (err) {
        console.error(err)
        setErrorMessage("MetaMask 연결 에러")
      }
    } else {
      alert("MetaMask를 설치하세요.")
      setErrorMessage("MetaMask를 설치하세요.")
      window.open("https://metamask.io/download.html")
    }
  }

  const accountsChanged = async (newAccount) => {
    setAccount(newAccount)
    setCookie("id", newAccount)
    navigate("/main")
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [newAccount.toString(), "latest"],
      })
      setBalance(ethers.utils.formatEther(balance))
    } catch (err) {
      console.error(err)
      setErrorMessage("MetaMask 연결 에러")
    }
  }

  const chainChanged = () => {
    setErrorMessage(null)
    setAccount(null)
    setBalance(null)
  }

  return (
    <div className="header section__padding">
      <img className="shake-vertical" src={sealogo3} width={650} />
      <div className="header-content">
        <div>
          <h1>
            멸종위기 동물 NFT 기부 플랫폼
            <br />
            <br />
            <h4>
              멸종위기 동물에게 Ethereum 기부하고 <br />
              자신과 동물이 담긴 그림 NFT 받아가세요!
            </h4>
          </h1>
          <img className="shake-vertical" src={coin} alt="" />
        </div>
      </div>

      {/* <img src={"https://pbs.twimg.com/profile_images/1403343064203239426/-9bH-cRS_400x400.jpg"} 
                className="App-logo" alt="logo" /> */}

      <Stack spacing={2}>
        <button className="button" onClick={connectHandler}>
          METAMASK LOGIN
        </button>

        {errorMessage ? (
          <Typography variant="body1" color="red">
            Error: {errorMessage}
          </Typography>
        ) : null}
      </Stack>
      <button className="infoButton" onClick={showNFTInfo}>
        METAMASK?
      </button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}

export default LoginPage
