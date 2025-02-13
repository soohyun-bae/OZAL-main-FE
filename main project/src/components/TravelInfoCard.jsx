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

  const [loadedContentIds, setLoadedContentIds] = useState(new Set());

  useEffect(() => {
    if (!!selectedDistrict && !!selectedCity) {
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


  useEffect(() => {
    if(tourListData?.length > 0) {
      const newIds = new Set(loadedContentIds);
      const fetchList = tourListData.filter(
        (item) => !newIds.has(item.contentid) && !detailInfoData?.find((info) => info.contentid === item.contentid)
      );
      fetchList.forEach((item) => {
        console.log(`contentid: ${item.contentid}`);
        dispatch(fetchDetailInfo(item.contentid));
        newIds.add(item.contentid);
      });
      setLoadedContentIds(newIds);
    }
  }, [tourListData])

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
                to={`detail/${i.contentid}`}
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
                  <div className="info-content">
                    {detailInfoLoading? (
                      'Loading...'
                    ) : (
                      detailInfoData?.find((info) => String(info.contentid) === String(i.contentid))?.overview || 'overview'
                    )}
                    </div>
                </div>
              </Link>
            );
          })
      )}
    </div>
  );
};

export default TravelInfoCard;
