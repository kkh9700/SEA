import * as React from "react"
import { useState } from "react"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import api from "api/api.js"
import Modal from "../../../components/modal/Modal"
import NFTsale from "../nftsale/NFTsale"

export default function Menu(props) {
  const [animalList, setAnimalList] = React.useState([])
  //그 중 선택한 동물 값 저장 변수
  const [animalName, setAnimalName] = React.useState("전체보기")
  //동물 리스트 불러올 때 쓸 useEffect

  // 판매 하기 모달
  const [modalOpen1, setModalOpen1] = useState(false)
  const openModal1 = () => {
    setModalOpen1(true)
    document.body.style.overflow = "hidden";
  }
  const closeModall = () => {
    setModalOpen1(false)
    document.body.style.overflow = "unset";
  }

  // 구매 하기 모달
  const [modalOpen2, setModalOpen2] = useState(false)
  const openModal2 = () => {
    setModalOpen2(true)
    document.body.style.overflow = "hidden";
  }
  const closeModal2 = () => {
    setModalOpen2(false)
    document.body.style.overflow = "unset";
  }

  //then 처리 내부
  //   React.useEffect(() => {
  //     axios
  //       .get("http://j7a506.p.ssafy.io:8080/api/v1/animal/name-list")
  //       .then((response) => {
  //         console.log(response.data.list)
  //         setAnimalList(response.data.list)
  //       })
  //   }, [])

  //then 이 외부?
  React.useEffect(() => {
    api.animal.getAnimalNameList().then((response) => {
      //console.log(response.list)
      setAnimalList([{ animalName: "전체보기" }, ...response.list])
    })
  }, [])

  //console.log(animalList)
  const handleChange = (event) => {
    setAnimalName(event.target.value)
    props.setAnimalName(event.target.value)
    //console.log(event.target.value)
  }
  return (
    <Stack spacing={6} direction="row">
      <FormControl
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          borderRadius: "1rem",
        }}
        variant="filled"
        fullWidth
      >
        <InputLabel
          sx={{
            fontSize: "17px",
            fontWeight: 900,
          }}
          id="demo-simple-select-label"
        >
          동물 종 선택하기
        </InputLabel>
        <Select
          sx={{
            fontSize: "17px",
            fontWeight: 900,
            lineHeight:"0.5rem"
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={animalName}
          label="동물 종 선택하기"
          onChange={handleChange}
        >
          {animalList.map((animal, idx) => (
            <MenuItem key={idx} value={animal.animalName}>
              {animal.animalName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* <Button variant="contained" >판매내역</Button> */}
      <Button
        sx={{
          width: "15rem",
          fontSize: "25px",
          backgroundColor: "rgba(50, 100, 150, 0.5)",
        }}
        variant="contained"
        onClick={openModal1}
      >
        판매하기
      </Button>
      <Modal open={modalOpen1} close={closeModall} header="판매하기">
        <NFTsale />
      </Modal>

      <Modal open={modalOpen2} close={closeModal2} header="구매하기">
        구매
      </Modal>
    </Stack>
  )
}
