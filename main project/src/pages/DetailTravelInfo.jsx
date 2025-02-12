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

  const detail = detailTravelInfoData?.find(
    (item) => item.contentid === contentid
  );

  return (
    <div className="info-detail">
        <div key={detail.contentid}>
          <img src={detail.firstimage} className="big-image" />
          <div className="detail-text">
            <h1>{detail.title}</h1>
            <div>{detail.hmpg}</div>
            <div className="address">{detail.addr1}</div>
            <hr></hr>
            <h2>overview</h2>
            <div className="info-content">{detail.overview}</div>
          </div>
        </div>
    </div>
  );
};

export default DetailTravelInfo;
