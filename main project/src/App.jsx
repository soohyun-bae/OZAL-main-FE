import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/mainpage.jsx";
import TravelDiaryPage from "./pages/Traveldiarypage";
import TravelInfopage from "./pages/TravelInfopage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/travel-diary" element={<TravelDiaryPage />} />
        <Route path="/travel-info" element={<TravelInfopage />} />
      </Routes>
    </Router>
  );
}

export default App;
