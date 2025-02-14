import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCityName, fetchDistrictName } from "../../RTK/thunk";
import { setSelectedCity, setSelectedDistrict } from "../../RTK/slice";
import "../../style/travelInfopage.scss";
import TagList from './TagList';

const TagSelector = () => {
  const dispatch = useDispatch();
  const selectedCity = useSelector((state) => state.city.selectedCity)
  const selectedDistrict = useSelector((state) => state.district.selectedDistrict)
  const { data: filteredCityData, loading: cityLoading } = useSelector((state) => state.city);
  const { data: filteredDistrictData } = useSelector((state) => state.district);

  useEffect(() => {
    dispatch(fetchCityName());
  }, []);

  const handleCityClick = (areaCode) => {
    if(selectedCity === areaCode) {
      dispatch(setSelectedCity(null));
      dispatch(setSelectedDistrict(null));
    } else {
      dispatch(setSelectedCity(areaCode));
      dispatch(setSelectedDistrict(null));
    }
  };

  useEffect(() => {
    if(selectedCity) {
      dispatch(fetchDistrictName(selectedCity));
    } else {
      dispatch(setSelectedDistrict(null));
    }
  }, [selectedCity])
  
  const handleDistrictClick = (code) => {
    if(selectedDistrict === code) {
      dispatch(setSelectedDistrict(null));
    } else {
      dispatch(setSelectedDistrict(code));
    }
  };

  return (
    <>
      <div className="tag-container">
        {cityLoading ? (
          <div>Loading...</div>
        ) : (
        <TagList className="city-name" data={filteredCityData} onItemClick={handleCityClick} />
        )}
        {selectedCity && filteredDistrictData && (
          <TagList className="district-name" data={filteredDistrictData} onItemClick={(code) => handleDistrictClick(code)} />
        )}
      </div>
    </>
  );
};

export default TagSelector;
