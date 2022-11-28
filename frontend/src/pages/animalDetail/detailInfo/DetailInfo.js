import * as React from "react"
import { useState } from "react"
import styles from "./DetailInfo.module.css"
import InfoIcon from "@mui/icons-material/Info"
import Button from "@mui/material/Button"
import SendIcon from "@mui/icons-material/Send"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import Modal from "../../../components/modal/Modal"
import Donation from "../donation/Donation"

function DetailInfo(props) {
  const MySwal = withReactContent(Swal)
  const info1 =
    "세계자연보전연맹(IUCN)이 분류한 적색목록으로써 멸종 위기의 동물을 체계적인 조사를 통해서 분류해놓은 것을 뜻합니다.\n" +
    "절멸 : 생존하는 개체가 없음\n" +
    "위급 : 심각한 수준의 멸종 위기\n" +
    "위기 : 멸종위기종으로 분류\n" +
    "취약 : 멸종위기 가능성이 높음"
  info1.replace(/\n/g, "<br/>")
  const [animalInfo, setAnimalInfo] = useState(props.animalInfo)

  const [modalOpen, setModalOpen] = useState(false)
  const openModal = () => {
    setModalOpen(true)
    document.body.style.overflow = "hidden";
  }
  const closeModal = () => {
    setModalOpen(false)
    document.body.style.overflow = "unset";
  }

  const infoClick = () => {
    MySwal.fire({
      title: <p>위기 등급이란?</p>,
      html: `
      <b>세계자연보전연맹(IUCN)이 분류한 적색목록으로써 멸종 위기의 동물을 체계적인 조사를 통해서 분류해놓은 것을 뜻합니다.</b><br><br>
      절멸 : 생존하는 개체가 없음<br>
      위급 : 심각한 수준의 멸종 위기<br>
      위기 : 멸종위기종으로 분류<br>
      취약 : 멸종위기 가능성이 높음`,
      confirmButtonText: "Next",
    }).then(() => {
      return MySwal.fire({
        title: <p>등급 별 NFT 수량</p>,
        html: `
        <b>
        위급 : 100개<br>
        위기 : 300개<br>
        취약 : 1000개</b>`,
      })
    })
  }
  React.useEffect(() => {
    //console.log(animalInfo)
    setAnimalInfo(props.animalInfo)
  }, [props.animalInfo])
  return (
    <>
      <div className={styles.Title}>
        <div>
          <div className={styles.animalClass}>
            {animalInfo.animalType} / 
            {animalInfo.animalEndangeredLevel === 1
              ? " 위급 "
              : animalInfo.animalEndangeredLevel === 2
              ? " 위기 "
              : " 취약 "}
            {/* ({animalInfo.animalMaxItem}NFT) */}
            <InfoIcon
              onClick={infoClick}
              style={{
                cursor: "pointer",
              }}
            />
          </div>
          <div className={styles.animalName}>{animalInfo.animalKoreanName}</div>
        </div>
        <div className={styles.donationSide}>
          <div className={styles.NFTcount}>
          {animalInfo.animalMaxItem}개 중 {animalInfo.animalMaxItem - animalInfo.animalNowItem}개의 NFT가
            남아있습니다.
          </div>
          <button
          className={styles.button}
            variant="contained"
            size="large"
            endIcon={<SendIcon />}
            onClick={openModal}
          >
            기부하기
          </button>
          <Modal open={modalOpen} close={closeModal} header="기부하기"><Donation /></Modal>
        </div>
      </div>
      <div className={styles.Info}>
        <p className={styles.InfoTitle}>동물 정보</p>
        <div className={styles.InfoText}>{animalInfo.animalDesc}</div>
      </div>
    </>
  )
}

export default DetailInfo
