import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailInfo, fetchTourList } from "../RTK/thunk";
import "../style/travelInfopage.scss";
import { Link } from "react-router-dom";
import { clearTourList } from "../RTK/slice";

const TravelInfoCard = () => {
  const dispatch = useDispatch();
  const selectedDistrict = useSelector(
    (state) => state.district.selectedDistrict
  );
  const selectedCity = useSelector((state) => state.city.selectedCity);
  const { data: tourListData, loading: tourListLoading } = useSelector(
    (state) => state.tourList
  );
  const { data: detailInfoData, loading: detailInfoLoading } = useSelector(
    (state) => state.detailInfo
  );

  useEffect(() => {
    if (selectedDistrict && selectedCity) {
      dispatch(
        fetchTourList({
          areaCode: selectedCity,
          districtCode: selectedDistrict,
        })
      );
    } else {
      dispatch(clearTourList());
    }
  }, [selectedCity, selectedDistrict]);

  // useEffect(() => {
  //   if (tourListData?.length > 0) {
  //     tourListData.forEach((i) => {
  //       if (!detailInfoData?.find((info) => info.contentid === i.contentid)) {
  //         dispatch(fetchDetailInfo(i.contentid));
  //       }
  //     });
  //   }
  // }, [dispatch, tourListData, detailInfoData]);
  // 반복문 안에 api호출은 안하기
  // 비동기 처리!!!

  const getOverview = async (contentid) => {
    if (overviews[contentid]) {
      return overviews[contentid];
    }
  };
  
  return (
    <div className="card-container">
      {tourListLoading || detailInfoLoading ? (
        <p>Loading...</p>
      ) : (
        tourListData
          ?.filter((i) => i.firstimage2)
          .map((i) => {
            return (
              <Link
                to={`/travel-info/detail-travel-info/${i.contentid}`}
                key={i.contentid}
                className="card-contents"
              >
                <img
                  src={i.firstimage2}
                  className="small-image"
                  alt={i.title}
                />
                <div className="info-article">
                  <div className="info-title">{i.title}</div>
                  <div className="info-addr">{i.addr1}</div>
                  <div className="info-content">{overview}</div>
                </div>
              </Link>
            );
          })
      )}
    </div>
  );
};

export default TravelInfoCard;
