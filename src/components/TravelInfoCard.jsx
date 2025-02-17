import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailInfo, fetchTourList } from "../RTK/thunk";
import "../style/travelInfopage.scss";
import ListStyle from "./List/List.module.scss";
import CardStyle from './Card/Card.module.scss';
import { clearTourList } from "../RTK/slice";
import Card from "./Card/Card";
import MappedList from "./List/MappedList";

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

  const { allDistrictData } = useSelector((state) => state.district);

  const [loadedContentIds, setLoadedContentIds] = useState(new Set());

  useEffect(() => {
    console.log('all district data:', allDistrictData)

    if (!!selectedCity) {
      allDistrictData.forEach((district) => {
        // 각 구에 대해 fetchTourList 호출
        dispatch(
          fetchTourList({
            areaCode: selectedCity,
            districtCode: district.code, // 구 코드
          })
        );
      });
    }
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
  }, [selectedCity, selectedDistrict, allDistrictData]);

  useEffect(() => {
    if (tourListData?.length > 0) {
      const newIds = new Set(loadedContentIds);
      const fetchList = tourListData.filter(
        (item) =>
          !newIds.has(item.contentid) &&
          !detailInfoData?.find((info) => info.contentid === item.contentid)
      );
      fetchList.forEach((item) => {
        dispatch(fetchDetailInfo(item.contentid));
        newIds.add(item.contentid);
      });
      setLoadedContentIds(newIds);
    }
  }, [tourListData]);

  const filteredTourListData =
    tourListData?.filter((i) => {
      const imageUrl = i.firstimage2;
      return imageUrl && !imageUrl.trim().endsWith(".bmp");
    }) || [];

  return (
    // <div className={CardStyle['card-wrapper']}>
      <div className={CardStyle['card-container']}>
        {tourListLoading || detailInfoLoading ? (
          <p>Loading...</p>
        ) : (
          <MappedList
            className={ListStyle["vertical-list-ul"]}
            data={filteredTourListData}
            renderItem={(i) => (
              <Card
                key={i.contentid}
                to={`/travel-info/detail/${i.contentid}`}
                src={i.firstimage2}
                title={i.title}
                info={i.addr1}
                content={
                  detailInfoLoading
                    ? "Loading..."
                    : detailInfoData?.find(
                        (info) => String(info.contentid) === String(i.contentid)
                      )?.overview || "overview"
                }
              />
            )}
          />
        )}
      </div>
    // </div>
  );
};

export default TravelInfoCard;
