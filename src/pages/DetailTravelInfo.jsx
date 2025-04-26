import "../style/detailTravelInfo.scss";
import { useParams } from "react-router-dom";
import { useFetchDetailInfoQuery } from "../RTK/tour/tourApi";

const DetailTravelInfo = () => {
  const { contentid } = useParams();
  const { data, isLoading, error } = useFetchDetailInfoQuery(contentid, {
    skip: !contentid,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>에러 발생: {error.error}</p>;

  const detail = Array.isArray(data) ? data[0] : data;

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
