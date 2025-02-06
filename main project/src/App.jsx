import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/mainpage.jsx";
import TravelDiaryPage from "./pages/Traveldiarypage";
import Travelhistory from "./components/Travelhistory.jsx";
import TravelInfopage from "./pages/TravelInfopage.jsx";
import Mypage from "./pages/Mypage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/travel-diary" element={<TravelDiaryPage />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/write-post" element={<Travelhistory />} />
        <Route path="/travel-info" element={<TravelInfopage />} />
      </Routes>
    </Router>
  );
}

export default App;
