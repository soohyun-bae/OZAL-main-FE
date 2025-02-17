import React, { useEffect } from "react";
import MappedList from "../MappedList";
import { useDispatch, useSelector } from "react-redux";
// import { setAllDistrictData, setSelectedCity, setSelectedDistrict } from "../../../RTK/slice";
import ListStyle from ".././List.module.scss";
// import { fetchDistrictName } from "../../../RTK/thunk";
import { setSelectedCity, setSelectedDistrict } from "../../../RTK/tour/slice";
import { fetchDistrictName } from "../../../RTK/tour/thunk";

const TagList = () => {
  const dispatch = useDispatch();
  const selectedCity = useSelector((state) => state.city.selectedCity);
  const selectedDistrict = useSelector(
    (state) => state.district.selectedDistrict
  );
  const { data: filteredCityData, loading: cityLoading } = useSelector(
    (state) => state.city
  );
  const { data: filteredDistrictData } = useSelector((state) => state.district);

  const handleCityClick = (areaCode) => {
    if (selectedCity === areaCode) {
      dispatch(setSelectedCity(null));
      dispatch(setSelectedDistrict(null));
      // dispatch(setAllDistrictData([]));
    } else {
      dispatch(setSelectedCity(areaCode));
      dispatch(setSelectedDistrict(null));
      // dispatch(setAllDistrictData([]));
      dispatch(fetchDistrictName(areaCode)); // 해당 도시의 모든 구 목록을 가져오기
    }
  };
  
  useEffect(() => {
    if (selectedCity) {
      dispatch(fetchDistrictName(selectedCity));
      // dispatch(setAllDistrictData([]));
    } else {
      dispatch(setSelectedDistrict(null));
    }
  }, [selectedCity]);

  const handleDistrictClick = (code) => {
    if (selectedDistrict === code) {
      dispatch(setSelectedDistrict(null));
    } else {
      dispatch(setSelectedDistrict(code));
    }
  };
  return (
    <>
      {cityLoading ? (
        <div>Loading...</div>
      ) : (
        <MappedList
          className={ListStyle["horizon-list-ul"]}
          data={filteredCityData}
          renderItem={(item) => (
            <div
              className={`${ListStyle["city-name"]} ${
                selectedCity === item.code ? ListStyle.active : ""
              }`}
              onClick={() => handleCityClick(item.code)}
            >
              {item.name}
            </div>
          )}
        />
      )}
      {selectedCity && filteredDistrictData && (
        <MappedList
          className={ListStyle["horizon-list-ul"]}
          data={filteredDistrictData}
          renderItem={(item) => (
            <div
              className={`${ListStyle["district-name"]} ${
                selectedDistrict === item.code ? ListStyle.active : ""
              }`}
              onClick={() => handleDistrictClick(item.code)}
            >
              {item.name}
            </div>
          )}
        />
      )}
    </>
  );
};

export default TagList;
