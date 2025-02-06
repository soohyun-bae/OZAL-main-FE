import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailInfo, fetchTourList } from "../RTK/thunk";
import "../style/travelInfopage.scss";

const TravelInfoCard = () => {
  const dispatch = useDispatch();
  const selectedDistrict = useSelector(
    (state) => state.district.selectedDistrict
  );
  const selectedCity = useSelector(
    (state) => state.city.selectedCity
  );
  const { data: tourListData } = useSelector((state) => state.tourList);
  const { data: detailInfoData = { items: { item: [] } } } = useSelector((state) => state.detailInfo || {});

  useEffect(() => {
    if(selectedDistrict && selectedCity){
      dispatch(fetchTourList({areaCode: selectedCity, districtCode: selectedDistrict}));
    }
  }, [dispatch, selectedCity, selectedDistrict]);

  useEffect(() => {
    if (tourListData.items?.item.length > 0) {
      tourListData.items.item.forEach((i) => {
        dispatch(fetchDetailInfo(i.contentid));
      });
    }
  }, [dispatch, tourListData]);

  const getOverview = (contentid) => {
    const detail = detailInfoData?.items?.item?.find(i => i.contentid === contentid);
    return detail ? detail.overview : 'overview';
  }

  console.log("Detail info data:", detailInfoData);

  return (
    <div className="card-container">
      {tourListData?.items?.item
        .filter((i) => i.firstimage2)
        .map((i) => {
          return (
          <div key={i.contentid} className="card-contents">
            <img src={i.firstimage2} className="small-image" alt={i.title} />
            <div>
              <div>{i.title}</div>
              <div>{i.addr1}</div>
              <div>{getOverview(i.contentid)}</div>
            </div>
          </div>
        )
        } 
        )}
    </div>
  );
};

export default TravelInfoCard;
