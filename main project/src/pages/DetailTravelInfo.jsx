import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailInfo } from "../RTK/thunk";
import "../style/detailTravelInfo.scss";
import { useParams } from "react-router-dom";

const DetailTravelInfo = () => {
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
    <div className="info-detail">
      {detailTravelInfoData?.map((i) => (
        <div key={i.contentid}>
          <img src={i.firstimage} className="big-image" />
          <div className="detail-text">
            <h1>{i.title}</h1>
            <div>{i.hmpg}</div>
            <div className="address">{i.addr1}</div>
            <hr></hr>
            <h2>overview</h2>
            <div className="info-content">{i.overview}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailTravelInfo;
