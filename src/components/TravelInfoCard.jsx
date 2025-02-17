import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchDetailInfo, fetchTourList } from "../RTK/tour/thunk";
import "../style/travelInfopage.scss";
import ListStyle from "./List/List.module.scss";
import CardStyle from './Card/Card.module.scss';
// import { clearTourList } from "../RTK/tour/slice";
import Card from "./Card/Card";
import MappedList from "./List/MappedList";
import { useFetchTourListQuery } from "../RTK/tour/tourApi";

const TravelInfoCard = () => {
  // const dispatch = useDispatch();
  const selectedDistrict = useSelector(
    (state) => state.district.selectedDistrict
  );
  const selectedCity = useSelector((state) => state.city.selectedCity);
  // const { data: tourListData, loading: tourListLoading } = useSelector(
  //   (state) => state.tourList
  // );
  // const { data: detailInfoData, loading: detailInfoLoading } = useSelector(
  //   (state) => state.detailInfo
  // );

  // const { allDistrictData } = useSelector((state) => state.district);

  // const [loadedContentIds, setLoadedContentIds] = useState(new Set());

  // useEffect(() => {
  //   if (!!selectedCity) {
  //     allDistrictData.forEach((district) => {
  //       // 각 구에 대해 fetchTourList 호출
  //       dispatch(
  //         fetchTourList({
  //           areaCode: selectedCity,
  //           districtCode: district.code, // 구 코드
  //         })
  //       );
  //     });
  //   }
  //   if (!!selectedDistrict && !!selectedCity) {
  //     dispatch(
  //       fetchTourList({
  //         areaCode: selectedCity,
  //         districtCode: selectedDistrict,
  //       })
  //     );
  //   } else {
  //     dispatch(clearTourList());
  //   }
  // }, [selectedCity, selectedDistrict, allDistrictData]);

  // useEffect(() => {
  //   if (tourListData?.length > 0) {
  //     const newIds = new Set(loadedContentIds);
  //     const fetchList = tourListData.filter(
  //       (item) =>
  //         !newIds.has(item.contentid) &&
  //         !detailInfoData?.find((info) => info.contentid === item.contentid)
  //     );
  //     fetchList.forEach((item) => {
  //       dispatch(fetchDetailInfo(item.contentid));
  //       newIds.add(item.contentid);
  //     });
  //     setLoadedContentIds(newIds);
  //   }
  // }, [tourListData]);

  const {
    data: tourListData,
    isLoading: tourListLoading,
    error: tourListError,
  } = useFetchTourListQuery(
    { areaCode: selectedCity, districtCode: selectedDistrict },
    { skip: !selectedCity || !selectedDistrict, staleTime: 1000 * 60 * 5 }
  );

  if (tourListLoading) return <p>Loading...</p>;
  if (tourListError) return <p>에러 발생: {tourListError.message}</p>;

  const filteredTourListData =
    tourListData?.filter((i) => {
      const imageUrl = i.firstimage2;
      return imageUrl && !imageUrl.trim().endsWith(".bmp");
    }) || [];

  return (
    // <div className={CardStyle['card-wrapper']}>
      <div className={CardStyle['card-container']}>
        {tourListLoading ? (
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
                // content={
                // //   // detailInfoLoading
                // //     // ? "Loading..."
                //     detailInfoData?.find(
                //         (info) => String(info.contentid) === String(i.contentid)
                //       )?.overview || "overview"
                // }
              />
            )}
          />
        )}
      </div>
    // </div>
  );
};

export default TravelInfoCard;
