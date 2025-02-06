import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailInfo } from "../RTK/thunk";
import "../style/detailTravelInfo.scss";
import { useParams } from "react-router-dom";
import Dropdown from "../components/dropdown";

const DetailTravelInfo = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const { contentid } = useParams();
  const { data: detailTravelInfoData } = useSelector(
    (state) => state.detailInfo
  );

  useEffect(() => {
    if (contentid) {
      dispatch(fetchDetailInfo(contentid));
      console.log(detailTravelInfoData);
    }
  }, [dispatch, contentid]);

  return (
    <div>
      <div>
        <Dropdown
          isOpen={isDropdownOpen}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        />
      </div>
      {detailTravelInfoData?.map((i) => (
        <div key={i.contentid}>
          <img src={i.firstimage} className="big-image" />
          <h1>{i.title}</h1>
          <div>{i.hmpg}</div>
          <div>{i.addr1}</div>
          <hr></hr>
          <h2>overview</h2>
          <div>{i.overview}</div>
        </div>
      ))}
    </div>
  );
};

export default DetailTravelInfo;
