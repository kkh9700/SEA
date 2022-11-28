import React from 'react';
import { CDBFooter, CDBFooterLink, CDBBox, CDBBtn, CDBIcon } from 'cdbreact';
import logo from '../footer/sea.png'
import { Link } from 'react-router-dom';
import styles from './Footer.module.css'

export default function Footer() {

  const e = {
    
  }
  return (
    // <CDBFooter className="shadow"> 
    <CDBFooter className={styles.bg}> 
    {/* <CDBBox><img alt="logo" src={logo} width="50px" /></CDBBox> */}
      <CDBBox display="flex" flex="column" className="mx-auto py-5" style={{ width: '70%' }}>
        <CDBBox display="flex" justifyContent="between" className="flex-wrap">
          <CDBBox className={styles.write}>
            <br/><br/>
              <img alt="logo" src={logo} width="50px" />
              <p className="h5 mb-4" style={{ fontWeight: '600' }}>
              SEA
            </p>
            <p className="my-3" style={{ width: '300px' }}>
            Save Endangered Animals<br />
              <br />
              A506<br />
              김현영 강경은 김경환 성성민 이종인<br />
              서울특별시 강남구 테헤란로 212
            </p>
          </CDBBox>
          <CDBBox className={styles.write}>
            <br/><br/>
            <p className="h5 mb-5" style={{ fontWeight: '600' }}>
              Pages
            </p>
            <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0' }}>
              {/* <a href="/main">Main Page</a><br/> */}
              {/* <a href="/main/express">Expression Page</a><br/> */}
              {/* <a href="/main/animalList">Animal List Page</a><br/> */}
              {/* <a href="/main/sale">Animal Sale Page</a><br/> */}
              {/* <a href="/main/mypage">My Page</a><br/> */}
              <e>Main Page</e><br/>
              <e>Expression Page</e><br/>
              <e>Animal List Page</e><br/>
              <e>Animal Sale Page</e><br/>
              <e>My Page</e><br/><br/>
            </CDBBox>
          </CDBBox>
          <CDBBox className={styles.write}>
            <br/><br/>
            <p className="h5 mb-5" style={{ fontWeight: '600' }}>
            Contact.
            </p>
            <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0' }}>
              <a href="/">Contact.</a><br/>
              <a color="inherit" href="https://www.nie.re.kr/endangered_species/home/main/main.do">
           멸종위기 야생생물 포털{' '}{new Date().getFullYear()}{'.'}
         </a>
            </CDBBox>

            <CDBBox
                  display="flex"
                  justifyContent="center"
                  style={{ width: '100%' }}
                  className="mx-auto mt-4"
                >
                <CDBBox display="flex" className="p-2">
                  <CDBBtn flat color="dark">
                    <CDBIcon fab icon="facebook-f" />
                  </CDBBtn>
                  <CDBBtn flat color="dark" className="mx-3">
                    <CDBIcon fab icon="twitter" />
                  </CDBBtn>
                  <CDBBtn flat color="dark" className="p-2">
                    <CDBIcon fab icon="instagram" />
                  </CDBBtn>
                </CDBBox>
            </CDBBox>
            
          </CDBBox>
        </CDBBox>
        <small className={styles.write}>&copy; Sea, 2022. All rights reserved.</small>
      </CDBBox>
      <br/><br/><br/><br/>
    </CDBFooter>
  );
};




