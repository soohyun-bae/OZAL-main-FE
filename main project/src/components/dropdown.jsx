import { useState } from "react";
import "../style/dropdown.scss";
import Modal from "./modal";
import { Link } from "react-router-dom";
import "../App.css";

const Dropdown = ({ isOpen, onMouseEnter, onMouseLeave }) => {
  const [modalOpen, setModalOpen] = useState(false);
  // const navigate = useNavigate();

  // const handleTravelClick = () => {
  //   console.log("드롭다운에서 여행기록 클릭됨");
  //   onTravelDiaryClick && onTravelDiaryClick();
  //   navigate("/travel-diary");
  // };

  return (
    <>
      <div
        className="dropdown-container"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="hamburger-menu">☰</div>
        {isOpen && (
          <div className="dropdown-menu">
            <div className="menu-items">
              <div className="login" onClick={() => setModalOpen(true)}>
                로그인
              </div>

              <div className="menu-item">마이페이지</div>
              <Link to={"/travel-diary"} className="menu-item">
                여행기록
              </Link>
              <Link to={"/travelInformation"} className="menu-item">
                여행정보
              </Link>
            </div>
          </div>
        )}
      </div>
      {modalOpen && <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />}
    </>
  );
};

export default Dropdown;
