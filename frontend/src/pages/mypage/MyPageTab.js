import * as React from "react"
import PropTypes from "prop-types"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
//import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import styles from "./MyPageTab.module.css"
import AnimalCollection from "./animalCollection/AnimalCollection"
import DonationList from "./donationList/DonationList"
import NFTList from "./NFTList/NFTList"
import SalesList from "./salesList/SalesList"


function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {/* {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )} */}
      {children}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: "100%" }} className={styles.outBox}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          className={styles.tabs}
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="myPage tab"
        >
          <Tab sx={{fontSize:18,fontWeight:'bold'}} label="작품목록" {...a11yProps(0)} />
          <Tab sx={{fontSize:18,fontWeight:'bold'}} label="내 기부 내역" {...a11yProps(1)} />
          <Tab
            sx={{fontSize:18,fontWeight:'bold'}}
            label="판매 중인 상품 목록"
            {...a11yProps(2)}
          />
          <Tab
            sx={{fontSize:18,fontWeight:'bold'}}
            label="기부한 동물 목록"
            {...a11yProps(3)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <NFTList></NFTList>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DonationList></DonationList>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SalesList></SalesList>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <AnimalCollection></AnimalCollection>
      </TabPanel>
    </Box>
  )
}
