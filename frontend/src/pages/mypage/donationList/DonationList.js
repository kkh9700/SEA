import * as React from "react"
import { useState, useEffect } from "react"
import { Pagination } from "@mui/material"
import usePagination from "components/pagination/Pagination"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
//import Paper from "@mui/material/Paper"
import styles from "./DonationList.module.css"
import api from "api/api"
import { Cookies } from "react-cookie"

export default function DonationList() {
  // list: [
  //   donationAmount: double,
  //   donationCreatedAt: LocalDateTime,
  //   animalKoreanName: String,
  //   donationStatusCode: String
  //   ]
  const [donationList, setDonationList] = useState([])

  const [page, setPage] = useState(1) // 처음 페이지는 1이다.
  const PER_PAGE = 10
  const count = Math.ceil(donationList.length / PER_PAGE)
  const data = usePagination(donationList, PER_PAGE)

  const handleChange = (e, p) => {
    setPage(p)
    data.jump(p)
  }

  useEffect(() => {
    //console.log("이예이예이예")
    const getDonationList = async () => {
      //console.log(cookies.get("accessToken"))
      const res = await api.donation.viewDonationLog()
      //console.log(res.list)
      setDonationList(res.list.reverse())
    }
    getDonationList()
  }, [])

  useEffect(() => {
    data.setNewData(donationList)
    return () => {}
  }, [donationList, data])
  return (
    <>
      <TableContainer className={styles.outDiv}>
        <Table
          sx={{ minWidth: 650, width: 800, margin: "auto"  }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow sx={{}}>
              <TableCell style={{ fontSize: "22px", fontWeight: "bold" }}>
                기부 동물 이름
              </TableCell>
              <TableCell
                style={{ width: 250,fontSize: "22px", fontWeight: "bold" }}
                align="right"
              >
                기부 금액
              </TableCell>
              <TableCell
                style={{ width: 250, fontSize: "22px", fontWeight: "bold" }}
                align="right"
              >
                기부 시간
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.currentData().map((row, idx) => (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  style={{ fontSize: "18px", fontWeight: "bold" }}
                  component="th"
                  scope="row"
                >
                  {row.animalKoreanName}
                </TableCell>
                <TableCell
                  style={{ fontSize: "18px", fontWeight: "bold" }}
                  align="right"
                >
                  {row.donationAmount} eth
                </TableCell>
                <TableCell
                  style={{ fontSize: "18px", fontWeight: "bold" }}
                  align="right"
                >
                  {row.donationCreatedAt[0]}년 {row.donationCreatedAt[1]}월{" "}
                  {row.donationCreatedAt[2]}일 {row.donationCreatedAt[3]}:
                  {row.donationCreatedAt[4]}.{row.donationCreatedAt[5]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
      </TableContainer>
    </>
  )
}
