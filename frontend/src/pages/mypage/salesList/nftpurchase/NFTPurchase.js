import { useState, useEffect } from "react"
import { styled } from "@mui/material/styles"
import { useLocation, useNavigate } from "react-router-dom"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import ButtonBase from "@mui/material/ButtonBase"
import styles from "./NFTPurchase.module.css"
import withReactContent from "sweetalert2-react-content"
import api from "api/api"
import Swal from "sweetalert2"
import Web3 from "web3"
import abi from "abis/transaction/abi.json"
import LoadingSpinner from "components/loadingSpinner/loadingSpinner"
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
})

export default function ComplexGrid(props) {
  const [saleData, setSaleData] = useState({})
  const [balance, setBalance] = useState()
  const [myAccount, setMyAccount] = useState()
  const web3 = new Web3(window.ethereum)
  const MySwal = withReactContent(Swal)
  const [loading, setLoading] = useState(false)
  const [loadingText, setLoadingText] = useState("")
  const navigate = useNavigate()
  const isMine = props.isMine

  const getCurrentAccount = async () => {
    try {
      const currentAccounts = await web3.eth.getAccounts()
      setMyAccount(currentAccounts[0])
      const bal = await web3.eth.getBalance(currentAccounts[0])
      setBalance(bal / Math.pow(10, 18))
      return currentAccounts[0]
    } catch {
      console.log("err")
    }
  }

  const infoClick = async () => {
    try {
      const swalResponse = await MySwal.fire({
        title: <p>{saleData.animalKoreanName} NFT를 구매하시겠습니까?</p>,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        icon: "warning",
      })
      if (swalResponse.isConfirmed) {
        //console.log(myAccount)
        const traderAddress = saleData.saleContractAddress
        const salePrice = saleData.salePrice
        //console.log("앙냥")
        //console.log(saleData)
        const functionABI = new web3.eth.Contract(abi, traderAddress).methods
          .PurchaseToken(1)
          .encodeABI()
        //console.log(functionABI)

        setLoadingText("Purchasing NFT...")
        setLoading(true)
        const contract = await web3.eth.sendTransaction({
          from: myAccount,
          to: traderAddress,
          value: (salePrice * 10 ** 18).toString(),
          data: functionABI,
        })

        //console.log(contract)
        const saleId = saleData.saleId

        const responseFinishSale = await api.sale.saleSuccess(saleId, myAccount)
        //console.log(responseFinishSale)

        const itemId = saleData.itemId
        const itemPrice = salePrice
        const itemOwnerAddress = myAccount
        const responseChangeInfo = await api.item.changeItem(
          itemId,
          itemPrice,
          itemOwnerAddress,
        )
        //console.log(responseChangeInfo)
        //console.log("끝?")
        setLoading(false)
        Swal.fire({
          icon: "success",
          title: "구매 완료!",
          text: "구매가 완료되었습니다!",
          confirmButtonText: "확인",
        })
      } else if (swalResponse.isDismissed) {
        console.log("옴뇸뇸")
      }
    } catch (error) {
      setLoading(false)
    }
  }

  const saleCancle = async () => {
    //console.log(props.saleId)
    setLoadingText("Cancel NFT Sales...")
    setLoading(true)
    const res = await api.sale.deleteSale(props.saleId)
    //console.log(res)
    //console.log(res.statusCode)
    setLoading(false)
    if (res.statusCode === 200) {
      Swal.fire({
        icon: "success",
        title: "판매 취소 완료!",
        text: "판매 취소가 완료되었습니다!",
        confirmButtonText: "확인",
      }).then(props.closeModal(), navigate("/main"))
    } else {
      Swal.fire({
        icon: "error",
        title: "판매 취소 실패!",
        text: "판매 취소를 실패하였습니다!",
        confirmButtonText: "확인",
      }).then(props.closeModal(), navigate("/main"))
    }
  }

  const NFTClick = () => {
    Swal.fire({
      background: "rgba(211, 224, 234, 0.6)",
      width: "60rem",
      padding: "0rem 0rem 1rem 0rem",
      heightAuto: true,
      imageUrl: saleData.itemImgUrl,
      imageHeight: 900,
      // imageWidth: 1920,
      imageAlt: "NFT Image",
      //confirmButtonText: "닫기",
      showConfirmButton: false,
    })
  }

  useEffect(() => {
    const getSaleData = async () => {
      const result = await api.sale.getSaleDetail(props.saleId)
      //console.log(result.sale)
      setSaleData(result.sale)
    }

    getSaleData()
    getCurrentAccount()
  }, [])
  return (
    <Grid container spacing={2}>
      {loading && <LoadingSpinner text={loadingText}></LoadingSpinner>}
      <Grid item>
        <ButtonBase sx={{ width: 500, height: 500 }} onClick={NFTClick}>
          <Img alt="complex" src={saleData.itemImgUrl} />
        </ButtonBase>
      </Grid>

      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography
              sx={{ marginTop: "1rem" }}
              gutterBottom
              variant="h4"
              component="div"
            >
              {saleData.itemTitle}
            </Typography>
            <Grid sx={{ marginTop: "7rem" }}>
              <Typography variant="body1" gutterBottom>
                동물 이름 : {saleData.animalKoreanName}
              </Typography>

              <Typography variant="body1" gutterBottom>
                판매기간 : {new Date(saleData.saleStartTime).toLocaleString()} ~
              </Typography>
              <Typography variant="body1" gutterBottom>
                {new Date(saleData.saleEndTime).toLocaleString()}
              </Typography>
            </Grid>
            <Grid sx={{ marginTop: "7rem" }}>
              <Typography variant="body1" color="text.secondary">
                NFT 구매 금액 : {saleData.salePrice} eth
              </Typography>
              <Typography variant="body1" color="text.secondary">
                현재 잔고 : {Math.round(balance * 10000000) / 10000000} ETH
              </Typography>
              <Grid sx={{ marginTop: "3rem" }} item>
                {isMine ? (
                  <button
                    className={styles.button}
                    onClick={saleCancle}
                    style={{
                      cursor: "pointer",
                      color: "red",
                    }}
                  >
                    판매 취소하기
                  </button>
                ) : (
                  <button
                    className={styles.button}
                    onClick={infoClick}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    구매하기
                  </button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
