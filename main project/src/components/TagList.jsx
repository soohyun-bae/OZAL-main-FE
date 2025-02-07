import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCityName, fetchDistrictName } from "../RTK/thunk";
import { setSelectedCity, setSelectedDistrict } from "../RTK/slice";
import "../style/travelInfopage.scss";
import "../App.css";

const TagList = () => {
  const dispatch = useDispatch();
  const { data: filteredCityData } = useSelector((state) => state.city);
  const { data: filteredDistrictData } = useSelector((state) => state.district);

  useEffect(() => {
    dispatch(fetchCityName());
  }, [dispatch]);

  const handleCityClick = (areaCode) => {
    dispatch(setSelectedCity(areaCode));
    dispatch(fetchDistrictName(areaCode));
  };

  const handleDistrictClick = (code) => {
    dispatch(setSelectedDistrict(code));
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
        {filteredDistrictData && (
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
