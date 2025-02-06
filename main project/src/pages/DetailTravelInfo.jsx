import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailInfo } from "../RTK/thunk";
import '../style/detailTravelInfo.scss'

const DetailTravelInfo = () => {
  const dispatch = useDispatch();
  const selectedContentId = useSelector(
    (state) => state.tourList.selectedContentId
  );
  const { data: detailTravelInfoData } = useSelector(
    (state) => state.detailInfo
  );

  useEffect(() => {
    if (selectedContentId) {
      dispatch(fetchDetailInfo(selectedContentId));
      console.log(detailTravelInfoData);
    }
  }, [dispatch, selectedContentId]);

  return (
    <div>
      {detailTravelInfoData?.map((i) => (
        <div key={i.contentid}>
          <img src={i.firstimage} className="big-image"/>
          <h1>{i.title}</h1>
          <div>{i.hmpg}</div>
          <div>{i.addr1}</div>
          <hr>
          </hr>
          <h2>overview</h2>
          <div>{i.overview}</div>
        </div>
      ))}
    </div>
  );
};

export default DetailTravelInfo;
