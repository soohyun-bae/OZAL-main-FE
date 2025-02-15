import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailInfo, fetchTourList } from "../RTK/thunk";
import "../style/travelInfopage.scss";
import { clearTourList } from "../RTK/slice";
import Card from "./Card/Card";

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
    if (tourListData?.length > 0) {
      const newIds = new Set(loadedContentIds);
      const fetchList = tourListData.filter(
        (item) =>
          !newIds.has(item.contentid) &&
          !detailInfoData?.find((info) => info.contentid === item.contentid)
      );
      fetchList.forEach((item) => {
        console.log(`contentid: ${item.contentid}`);
        dispatch(fetchDetailInfo(item.contentid));
        newIds.add(item.contentid);
      });
      setLoadedContentIds(newIds);
    }
  }, [tourListData]);

  return (
    <div className="card-container">
      {tourListLoading || detailInfoLoading ? (
        <p>Loading...</p>
      ) : (
        tourListData
          ?.filter((i) => i.firstimage2)
          .map((i) => {
            return (
              <Card
                key={i.contentid}
                to={`/travel-info/detail/${i.contentid}`}
                src={i.firstimage2}
                title={i.title}
                info={i.addr1}
                content={detailInfoLoading? (
                          'Loading...'
                        ) : (
                          detailInfoData?.find((info) => String(info.contentid) === String(i.contentid))?.overview || 'overview'
                        )}
              />
            );
          })
      )}
    </div>
  );
};

export default TravelInfoCard;
