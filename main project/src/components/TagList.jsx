import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCityName, fetchDistrictName } from "../RTK/thunk";
import { setSelectedCity, setSelectedDistrict } from "../RTK/slice";
import "../style/travelInfopage.scss";
import "../App.css";

const TagList = () => {
  const dispatch = useDispatch();
  const selectedCity = useSelector((state) => state.city.selectedCity)
  const selectedDistrict = useSelector((state) => state.district.selectedDistrict)
  const { data: filteredCityData } = useSelector((state) => state.city);
  const { data: filteredDistrictData } = useSelector((state) => state.district);

  useEffect(() => {
    dispatch(fetchCityName());
  }, [dispatch]);

  useEffect(() => {
    if(selectedCity) {
      dispatch(fetchDistrictName(selectedCity));
    } else {
      dispatch(setSelectedDistrict(null));
    }
  }, [dispatch, selectedCity])

  useEffect(() => {
    console.log("Selected City:", selectedCity);
    console.log("Selected District:", selectedDistrict);
  }, [selectedCity, selectedDistrict]);

  const handleCityClick = (areaCode) => {
    if(selectedCity === areaCode) {
      dispatch(setSelectedCity(null));
      dispatch(setSelectedDistrict(null));
    } else {
      dispatch(setSelectedCity(areaCode));
      // dispatch(fetchDistrictName(areaCode));
    }
  };

  const handleDistrictClick = (code) => {
    if(selectedDistrict === code) {
      dispatch(setSelectedDistrict(null));
      console.log(selectedDistrict)
    } else {
      dispatch(setSelectedDistrict(code));
    }
  };

  return (
    <>
      <div className="tag-container">
        <ul>
          {filteredCityData?.map((city) => (
            <li
              key={city.code}
              className="city-name"
              onClick={() => handleCityClick(city.code)}
            >
              {city.name}
            </li>
          ))}
        </ul>
        {selectedCity && filteredDistrictData &&(
          <ul>
            {filteredDistrictData?.map((district) => (
              <li
                key={district.code}
                className="district-name"
                onClick={() => handleDistrictClick(district.code)}
              >
                {district.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default TagList;
