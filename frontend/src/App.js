import logo from "./logo.svg"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import "./App.css"
import Navbar from "./components/navbar"
import Footer from "./components/footer/Footer"
import MainPage from "./pages/main/Mainpage"
import LoginPage from "./pages/login/LoginPage"
import ExpressionPage from "./pages/expression/ExpressionPage"
import MyPage from "./pages/mypage/MyPage"
import AnimalListPage from "./pages/animalList/AnimalList"
import AnimalList from "./pages/animalList/AnimalList"
import AnimalDetail from "./pages/animalDetail/AnimalDetailPage"
import { CookiesProvider } from "react-cookie"
import SalePage from "pages/sales/SalePage"
import Minting from "pages/minting/Minting"
import api from "../src/api/api"
import ScrollToTop from "components/scrollToTop/ScrollToTop"
import ForestIcon from "@mui/icons-material/Forest"

function App() {
  let header = (
    <div>
      {/* <Link to="/login">
        <button>로그인</button>
      </Link> */}
      <LoginPage />
    </div>
  )

  return (
    <div className="App">
      <CookiesProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <article>
            <div className="stars">
              <div className="mainArticleDiv">
                <Routes>
                  <Route path="/" element={header}></Route>
                  <Route path="/login" element={<LoginPage />}></Route>
                  <Route path="/main/*" element={<MainPage />}></Route>
                  <Route
                    path="main/express/*"
                    element={<ExpressionPage />}
                  ></Route>
                  <Route path="main/mypage/*" element={<MyPage />}></Route>
                  <Route
                    path="main/animalList"
                    element={<AnimalList />}
                  ></Route>
                  <Route path="main/sale" element={<SalePage />}></Route>
                  <Route
                    path="main/animalDetail"
                    element={<AnimalDetail />}
                  ></Route>
                  <Route path="main/minting" element={<Minting />}></Route>
                </Routes>
              </div>
            </div>
          </article>
          <a href="#">
            <button className="goToUpButton">
              <ForestIcon />
            </button>
          </a>
          <Footer />
        </BrowserRouter>
      </CookiesProvider>
    </div>
  )
}

export default App
