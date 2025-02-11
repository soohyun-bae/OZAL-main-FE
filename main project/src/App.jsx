import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Mainpage.jsx";
import TravelDiaryPage from "./pages/Traveldiarypage";
import Travelhistory from "./components/Travelhistory.jsx";
import TravelInfopage from "./pages/TravelInfopage.jsx";
import DetailTravelInfo from "./pages/detailTravelInfo.jsx";
import Mypage from "./pages/Mypage.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<Main />} />
          <Route path="/travel-diary" element={<TravelDiaryPage />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/write-post" element={<Travelhistory />} />
          <Route path="/travel-info" element={<TravelInfopage />} />
          <Route path="/detail-travel-info/:contentid" element={<DetailTravelInfo />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
