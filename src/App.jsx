import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Mainpage.jsx";
import TravelDiaryPage from "./pages/Traveldiarypage.jsx";
import Travelhistory from "./components/Travelhistory.jsx";
import TravelInfopage from "./pages/TravelInfopage.jsx";
import DetailTravelInfo from "./pages/DetailTravelInfo.jsx";
import Mypage from "./pages/Mypage.jsx";
import KakaoCallback from "./components/KakaoCallback.jsx";
import "./App.css";
import Header from "./layout/Header.jsx";
import DiaryDetailpage from "./pages/DiaryDetailpage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<Main />} />
          <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
          <Route path="/travel-diary" element={<TravelDiaryPage />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/write-post" element={<Travelhistory />} />
          <Route path="/travel-info" element={<TravelInfopage />} />
          <Route
            path="/travel-info/detail/:contentid"
            element={<DetailTravelInfo />}
          />
          <Route path="/diary/:id" element={<DiaryDetailpage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
