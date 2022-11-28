import * as React from "react"
import styles from "./MyPageInfo.module.css"
import { useState, useEffect } from "react"
import Web3 from "web3"

export default function MyPageInfo() {
  const myNFTToken = 1000 //후에 contract 주소에서 내 NFT 잔고를 가져오는 방식으로 변경

  const web3 = new Web3(window.ethereum)
  const [balance, setBalance] = useState()
  const [myAccount, setMyAccount] = useState()

  const getCurrentAccount = async () => {
    try {
      const currentAccounts = await web3.eth.getAccounts()
      // console.log(currentAccounts[0]);
      setMyAccount(currentAccounts[0])
      const bal = await web3.eth.getBalance(currentAccounts[0])
      // console.log(balance);
      setBalance(bal / Math.pow(10, 18))
      // console.log(web3);
      return currentAccounts[0]
    } catch {
      console.log("err")
    }
  }

  useEffect(() => {
    getCurrentAccount()
  }, [])

  return (
    <div className={styles.myPageInfo}>
      <div className={styles.title}>마이 페이지</div>
      <div className={styles.nftToken}>
        보유 이더리움 : {Math.round(balance * 100000) / 100000} ETH
        {/* <img
          className={styles.logoImg}
          src={require("resources/img/logo/ethereumLogo.png")}
          alt="ethreumLogo"
        ></img> */}
      </div>
    </div>
  )
}
