import { useDispatch, useSelector } from "react-redux";
import "../style/travelInfopage.scss";
import ListStyle from "./List/List.module.scss";
import CardStyle from "./Card/Card.module.scss";
import MappedList from "./List/MappedList";
import {
  useFetchDetailInfoQuery,
  useFetchTourListQuery,
} from "../RTK/tour/tourApi";
import TourInfoCardItem from "./Card/TourInfoCardItem";

const TravelInfoCard = () => {
  const selectedDistrict = useSelector(
    (state) => state.district.selectedDistrict
  );
  const selectedCity = useSelector((state) => state.city.selectedCity);

  const {
    data: nullTourListData = [],
    isLoading: tourListLoading,
    error: tourListError,
  } = useFetchTourListQuery(
    { areaCode: selectedCity, districtCode: selectedDistrict },
    { skip: !selectedCity || !selectedDistrict, staleTime: 1000 * 60 * 5 }
  );

  const tourListData =
  !selectedCity || !selectedDistrict ? [] : nullTourListData;

  const detailContentId = tourListData?.map((item) => item.contentid);

  const { data: detailInfoData, isLoading: detailLoading } =
    useFetchDetailInfoQuery(detailContentId, {
      skip: !tourListData || tourListData.length === 0,
    });

  if (tourListLoading) return <p>Loading...</p>;
  if (tourListError) return <p>에러 발생: {tourListError.message}</p>;
  if (tourListLoading || detailLoading) return <p>Loading...</p>;

  const filteredTourListData =
    tourListData?.filter((i) => {
      const imageUrl = i.firstimage2;
      return imageUrl && !imageUrl.trim().endsWith(".bmp");
    }) || [];

  console.log(detailInfoData);
  console.log("tourListData:", tourListData);

  return (
    <div className={CardStyle["card-container"]}>
      {tourListLoading ? (
        <p>Loading...</p>
      ) : (
        <MappedList
          className={ListStyle["vertical-list-ul"]}
          data={filteredTourListData}
          renderItem={(i) => <TourInfoCardItem key={i.contentid} i={i} />}
        />
      )}
    </div>
  );
};

export default TravelInfoCard;
