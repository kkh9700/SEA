import { alpha, styled } from "@mui/material/styles"
import { Box, Typography, Button, AppBar, Toolbar } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie'; 
import style from "./Navbar.module.css"
import React, { useEffect, useState } from "react"
import { ethers } from "ethers"
import api from "api/api"
import Web3 from "web3"

const Navbar = () => {
  const APPBAR_MOBILE = 64
  const APPBAR_DESKTOP = 92 

  const RootStyle = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    zIndex: "500",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    backgroundColor: alpha("#0C2032", 0),
  }))

  const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: APPBAR_MOBILE,
    [theme.breakpoints.up("lg")]: {
      minHeight: APPBAR_DESKTOP,
      padding: theme.spacing(0, 5),
    },
  }))

  const navigate = useNavigate()

  const web3 = new Web3(window.ethereum);
  const [balance, setBalance] = useState(null);
  const [account, setAccount] = useState(null);
  const [isAccount, setIsAccount] = useState(false);
  const [cookies, setCookie] = useCookies();

  const getCurrentAccount = async () => {
    try {
      const currentAccounts = await web3.eth.getAccounts()
      const bal = await web3.eth.getBalance(currentAccounts[0])
      setBalance(bal)
      setIsAccount(true)
      return currentAccounts[0]
    } catch {
      console.log("err")
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", accountsChanged);
      window.ethereum.on("chainChanged", chainChanged);
      getCurrentAccount();
    };
  },[]);

  const accountsChanged = async (newAccount) => {
    setAccount(newAccount);
    setCookie('id', newAccount);
    navigate("/main");
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [newAccount.toString(), "latest"],
      });
      setBalance(ethers.utils.formatEther(balance));
    } catch (err) {
      console.error(err);
    }
  };

  const chainChanged = () => {
    setAccount(null);
    setBalance(null);
  };
  

  const main = async() => {
    if(isAccount) {
      navigate("/main")
    } else {
      if (window.ethereum) {
        try {
          const res = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          await accountsChanged(res[0]);
          api.user.login(res[0]);
          navigate("/main")
        } catch (err) {
          console.error(err)
        }
      } else {
        alert("MetaMask를 설치하세요.")
        window.open("https://metamask.io/download.html")
      }
    }
  }

  const connect1 = async () => {
    if (isAccount) {
      navigate("/main/express")
    } else {
      if (window.ethereum) {
        try {
          const res = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          await accountsChanged(res[0]);
          api.user.login(res[0]);
          navigate("/main/express")
        } catch (err) {
          console.error(err)
        }
      } else {
        alert("MetaMask를 설치하세요.")
        window.open("https://metamask.io/download.html")
      }
    }
  }

  const connect2 = async () => {
    if (isAccount) {
      navigate("/main/animalList")
    } else {
      if (window.ethereum) {
        try {
          const res = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          await accountsChanged(res[0]);
          api.user.login(res[0]);
          navigate("/main/animalList")
        } catch (err) {
          console.error(err)
        }
      } else {
        alert("MetaMask를 설치하세요.")
        window.open("https://metamask.io/download.html")
      }
    }
  }

  const connect3 = async () => {
    if (isAccount) {
      navigate("/main/sale")
    } else {
      if (window.ethereum) {
        try {
          const res = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          await accountsChanged(res[0]);
          api.user.login(res[0]);
          navigate("/main/sale")
        } catch (err) {
          console.error(err)
        }
      } else {
        alert("MetaMask를 설치하세요.")
        window.open("https://metamask.io/download.html")
      }
    }
  }

  const connect4 = async () => {
    if (isAccount) {
      navigate("/main/mypage")
    } else {
      if (window.ethereum) {
        try {
          const res = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          await accountsChanged(res[0]);
          api.user.login(res[0]);
          navigate("/main/mypage")
        } catch (err) {
          console.error(err)
        }
      } else {
        alert("MetaMask를 설치하세요.")
        window.open("https://metamask.io/download.html")
      }
    }
  }

  return (
    <RootStyle>
      <ToolbarStyle>
        <div onClick={main} className={style.logoDiv}>
          <img className={style.logo} src="/images/logo/sea.png" alt="logo" />
        </div>
        <Button className={style.logoCharacterButton} onClick={main}>
          <span className={style.logoCharacter}>S</span>
          <span className={style.logoCharacter}>E</span>
          <span className={style.logoCharacter}>A</span>
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <div className={style.navButtonDiv}>
          <button
            className={style.navButton}
            // onClick={() => navigate("/main/express")}
            onClick={connect1}
          >
            나 표현하기
          </button>
          <hr className={style.navButtonUnderLine} />
        </div>
        <div className={style.navButtonDiv}>
          <button
            className={style.navButton}
            // onClick={() => navigate("/main/animalList")}
            onClick={connect2}
          >
            기금 목록
          </button>
          <hr className={style.navButtonUnderLine} />
        </div>
        <div className={style.navButtonDiv}>
          <button
            className={style.navButton}
            // onClick={() => navigate("/main/sale")}
            onClick={connect3}
          >
            판매페이지
          </button>
          <hr className={style.navButtonUnderLine} />
        </div>
        <div className={style.navButtonDiv}>
          <button
            className={style.navButton}
            // onClick={() => navigate("/main/mypage")}
            onClick={connect4}
          >
            마이페이지
          </button>
          <hr className={style.navButtonUnderLine} />
        </div>
        {/* <div className={style.navButtonDiv}>
          <button
            className={style.navButton}
            onClick={() => navigate("/main/minting")}
          >
            민팅페이지
          </button>
          <hr className={style.navButtonUnderLine} />
        </div> */}
      </ToolbarStyle>
    </RootStyle>
  )
}

export default Navbar
