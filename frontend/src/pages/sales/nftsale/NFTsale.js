import * as React from "react"
import { styled } from "@mui/material/styles"
import { useLocation, useNavigate, useHistory } from "react-router-dom"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import NFTCard from "./NFTCard"
import { useState, useEffect } from "react"
import { Pagination, Typography } from "@mui/material"
import usePagination from "components/pagination/Pagination"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { ko } from "date-fns/esm/locale"
import api from "api/api"
import styles from "./NFTsale.module.css"
import Web3 from "web3"

import nftAbi from "../../../abis/createNFT/abi.json"
import transactionAbi from "../../../abis/transaction/abi.json"
import transactionByteCode from "../../../abis/transaction/bytecode.json"
import LoadingSpinner from "components/loadingSpinner/loadingSpinner"

export default function NFTsale() {
  const MySwal = withReactContent(Swal)
  const [allData, setAllData] = useState([])
  const [page, setPage] = useState(1)
  const PER_PAGE = 4
  const count = Math.ceil(allData.length / PER_PAGE)
  const data = usePagination(allData, PER_PAGE)
  const [startDate, setStartDate] = useState(new Date()) // 달력은 뜨지만 현재 날짜로 고정되어 있음
  const [endDate, setEndDate] = useState(new Date())
  const [salePrice, setSalePrice] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e, p) => {
    setPage(p)
    data.jump(p)
  }

  // 선택한 NFT 데이터 (img, animalName, endangered)
  const [selectNFTdata, setSelectNFTdata] = useState()
  const getnft = (nftData) => {
    setSelectNFTdata(nftData)
  }

  const saleClick = async () => {
    try {
      const swalResponse = await MySwal.fire({
        title: <p>판매하시겠습니까?</p>,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        icon: "warning",
      })
      if (salePrice===null) {
        Swal.fire(
          "판매가격 미입력",
          "토큰을 입력해주세요.",
          "error",
        )
      }
      else if (salePrice <= 0) {
        Swal.fire(
          "판매가격 오류",
          "0 ETH 보다 높게 가격을 책정하세요.",
          "error",
        )
      }
      else if (swalResponse.isConfirmed) {
        setLoading(true)
        //console.log(selectNFTdata)
        window.web3 = new Web3(window.ethereum)
        const web3 = window.web3
        const myAddress = window.ethereum.selectedAddress
        const NFTaddress = selectNFTdata.NFTaddress
        //console.log(web3)
        //console.log(myAddress)
        //console.log(NFTaddress)

        const myAbi = transactionAbi
        // console.log(salePrice)
        // console.log("거래소 만드는 계약 전")
        const makeTraderContract = new web3.eth.Contract(myAbi)

        const traderResponse = await makeTraderContract
          .deploy({
            data: "0x" + transactionByteCode.object,
            arguments: [NFTaddress],
          })
          .send({ from: myAddress })

        //console.log(traderResponse)

        const contractAddress = traderResponse["_address"]
        // 기존의 NFT 계약에 대한 모든 권한을, 위에서 만든 거래소가 가져갈 수 있도록 한다.
        // NFT Contract 어드레스를 넣어준다.
        //console.log(contractAddress)

        const giveAuthContract = new web3.eth.Contract(nftAbi.abi, NFTaddress)
        const authResponse = await giveAuthContract.methods
          .setApprovalForAll(contractAddress, true)
          .send({ from: myAddress })
        //console.log("NFT 권한 부여 계약 response")
        //console.log(authResponse)

        const tokens = web3.utils.toWei(salePrice.toString(), "ether")
        const saleConfigContract = new web3.eth.Contract(myAbi, contractAddress)
        const saleResponse = await saleConfigContract.methods
          .SalesToken(1, tokens)
          .send({ from: myAddress })

        //console.log("sale 등록 response")
        //console.log(saleResponse)

        const itemId = selectNFTdata.itemId
        const start = startDate.getTime()
        const end = endDate.getTime()

        const res = await api.sale.openSale(
          contractAddress,
          start,
          end,
          salePrice,
          itemId,
        )
        //console.log(res)
        setLoading(false)
        Swal.fire({
          icon: "success",
          title: "등록 완료!",
          text: "작품 판매 등록이 완료되었습니다",
          confirmButtonText: "확인",
        }).then(() => 
          window.location.replace("/main/sale")
        )
      } else if (swalResponse.isDismissed) {
        console.log("취소")
      }
    } catch (error) {
      setLoading(false)
      console.log("앙냥냥")
    }
  }

  // 판매 가격 설정
  const onChangeAccount = (e) => {
    setSalePrice(e.target.value)
    //console.log(salePrice)
  }

  useEffect(() => {
    const getNFTList = async () => {
      const result = await api.item.getItem("User")
      setAllData(result.list)
    }
    getNFTList()

    // api 하려다 만것..
    const saleRegistration = async () => {
      const sale = await api.sale.openSale(
        // saleContractAddress,
        // saleCashContractAddress,
        startDate,
        endDate,
        // itemId,
      )
    }

    // console.log(selectNFTdata)
    // console.log(salePrice)
    //console.log(startDate)
    //console.log(endDate)
  }, [])

  useEffect(() => {
    data.setNewData(allData)
    return () => {}
  }, [allData, data])

  useEffect(() => {}, [loading])
  return (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
      {loading && (
        <LoadingSpinner text="Registering NFT sales..."></LoadingSpinner>
      )}
      <Box gridColumn="span 12">
        <Grid container spacing={3}>
          {data.currentData().map((data, idx) => (
            <Grid item key={idx} xs={12} sm={6} md={3}>
              <NFTCard NFTData={data} getNFTdata={getnft}></NFTCard>
            </Grid>
          ))}
        </Grid>
        <Pagination
          count={count}
          page={page}
          color="primary"
          size="large"
          sx={{
            margin: 2,
            display: "inline-block",
          }}
          onChange={handleChange}
        />
      </Box>

      <Box gridColumn="span 12">
        {/* <Typography gutterBottom variant="subtitle1" component="div">
              현재 가격 : 1000 RopstenETH
            </Typography> */}
        <Typography gutterBottom variant="subtitle1" component="div">
          판매 가격 설정(ETH) : <br />
          <input
            className={styles.input}
            type="number"
            step="0.001"
            placeholder="판매가격을 입력하세요"
            onChange={onChangeAccount}
            oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
          ></input>
          {/* <img
                  src={require("resources/img/logo/ethereumLogo.png")}
                  alt="ethreumLogo"
                ></img> */}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <Typography gutterBottom variant="subtitle1" component="div">
            판매 시작일 :
            <DatePicker
              className={styles.input}
              dateFormat="yyyy년 MM월 dd일"
              selected={startDate}
              // onChange={date => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              locale={ko}
            />
          </Typography>

          <Typography gutterBottom variant="subtitle1" component="div">
            판매 종료일 :
            <DatePicker
              className={styles.input}
              dateFormat="yyyy년 MM월 dd일"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              endDate={endDate.setHours(23, 59, 59, 59)}
              minDate={startDate}
              locale={ko}
            />
          </Typography>
        </Typography>
        <br />
        <Grid item>
          <Typography sx={{ cursor: "pointer" }} variant="body2">
            <button
              className={styles.button}
              onClick={saleClick}
              style={{
                cursor: "pointer",
              }}
            >
              판매하기
            </button>
          </Typography>
        </Grid>
      </Box>
    </Box>
  )
}
