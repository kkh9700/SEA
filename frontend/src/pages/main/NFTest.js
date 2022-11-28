import React, {useEffect, useCallback} from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import NFTCard from 'pages/mypage/NFTList/NFTCard';
import { useState } from "react"
import { Pagination } from "@mui/material"
import usePagination from "components/pagination/Pagination"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';
//////////////
import Web3 from "web3"
import { Link, useNavigate } from "react-router-dom"


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function NFTTest() {

  const web3 = new Web3(window.ethereum);
  const [balance, setBalance] = useState();

  const getCurrentAccount = async() => {
    try {
      const currentAccounts = await web3.eth.getAccounts();
      // console.log(currentAccounts[0]);
      const bal = await web3.eth.getBalance(currentAccounts[0]);
      // console.log(balance);
      setBalance(bal);
      console.log(web3);
      return currentAccounts[0];
    } catch {
      console.log("err");
    }
  }

  useEffect(()=> {
    getCurrentAccount();
  },[]);
  
  const MySwal = withReactContent(Swal)
  const allData = []

  for (let index = 0; index < 27; index++) {
    let endangered = ""
    if (index % 3 === 0) {
      endangered = "멸종"
    } else if (index % 3 === 1) {
      endangered = "위급"
    } else {
      endangered = "위기"
    }
    const newItem = {
      animalImg: "https://source.unsplash.com/random",
      animalName: "여우",
      endangered: endangered,
    }
    allData.push(newItem)
  }

  const [page, setPage] = useState(1) // 처음 페이지는 1이다.
  const PER_PAGE = 4
  const count = Math.ceil(allData.length / PER_PAGE)
  const data = usePagination(allData, PER_PAGE)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleChange = (e, p) => {
    setPage(p)
    data.jump(p)
  }

  const infoClick = () => {
    MySwal.fire({
      title: <p>기부하시겠습니까?</p>,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            icon: 'warning'
    }).then((result) => {  
      // donation : 내가 기부할 기부금 
      // balance : 잔고
      if (result.isConfirmed) {
        if(balance<0.01){
          Swal.fire('잔액 미달', '토큰잔액이 최소 기부금 미달입니다.<br />충전 후 기부해주세요.', 'error')
        }
        else if(donation>balance){
          Swal.fire('잔액 부족', '잔액이 부족합니다. <br />충전 후 기부해주세요', 'error')
        }
        else if(donation<0.01){
          Swal.fire('최소 기부금 미달', '기부금은 0.01SSF 이상 가능합니다.<br />충전 후 기부해주세요.', 'error')
        }
        else
        Swal.fire('기부가 완료되었습니다.', '감사합니다. </br>많은 기부 부탁드립니다.', 'success');
      } 
      else
      Swal.fire('진행 중단', '', 'error')
    })
  }


const [donation, setDonation] = useState({
  mydonation: "",
});

const onChangeAccount = (e) => {
  setDonation({
    ...donation,
    [e.target.name]: e.target.value,
  });
};   

const navigate = useNavigate();
  

  return (
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 12">
        {/* <input type="number" step="0.01" onKeyDown={handleKeyDown} /><br /> */}
        <input type="number" step="0.01" placeholder='기부금을 입력하세요' onChange={onChangeAccount}
        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"></input>
            <Typography variant="body2" gutterBottom>
           
            
            </Typography><br/>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                <Button onClick={infoClick}
                  style={{
                    cursor: "pointer",
                  }}>판매하기</Button>
              </Typography>
            </Grid>
        </Box>
      </Box>

  );
}
