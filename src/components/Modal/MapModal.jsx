import React, { useState, useEffect, useCallback, useRef } from "react";
import "../../style/MapModal.scss";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../RTK/modalSlice";

const MapModal = ({ onSelect }) => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [infowindow, setInfowindow] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [places, setPlaces] = useState([]);
  const dispatch = useDispatch();
  const isMapModalOpen = useSelector((state) => state.modal.isMapModalOpen);
  const mapRef = useRef();

  // 지도 초기화
  useEffect(() => {
    console.log('Map container ref:', mapRef.current);
    if (!mapRef.current) return;
    const options = {
      center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3,
    };
    const mapInstance = new window.kakao.maps.Map(mapRef.current, options);
    const infowindowInstance = new window.kakao.maps.InfoWindow({ zIndex: 1 });

    setMap(mapInstance);
    setInfowindow(infowindowInstance);
  }, [mapRef.current]);

  // 키워드 검색
  const searchPlaces = useCallback(() => {
    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      alert("키워드를 입력해주세요!");
      return false;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, placesSearchCB);
  }, [keyword]);

  // 검색 콜백
  const placesSearchCB = (data, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      setPlaces(data);
      displayPlaces(data);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
      setPlaces([]);
      removeMarker();
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
    }
  };

  // 검색 결과 표시
  const displayPlaces = (places) => {
    removeMarker();
    const bounds = new window.kakao.maps.LatLngBounds();

    places.forEach((place, i) => {
      const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = addMarker(placePosition, i);
      bounds.extend(placePosition);

      // 마커와 목록 이벤트
      window.kakao.maps.event.addListener(marker, "mouseover", () => {
        displayInfowindow(marker, title);
      });
      window.kakao.maps.event.addListener(marker, "mouseout", () => {
        if (infowindow) infowindow.close();
      });
    });
    if (map) {
      map.setBounds(bounds);
    }
  };

  // 마커 생성
  const addMarker = (position, idx) => {
    const imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
    const imageSize = new window.kakao.maps.Size(36, 37);
    const imgOptions = {
      spriteSize: new window.kakao.maps.Size(36, 691),
      spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
      offset: new window.kakao.maps.Point(13, 37),
    };
    const markerImage = new window.kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imgOptions
    );
    const marker = new window.kakao.maps.Marker({
      position,
      image: markerImage,
    });

    marker.setMap(map);
    setMarkers((prev) => [...prev, marker]);
    return marker;
  };

  // 마커 제거
  const removeMarker = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  const displayInfowindow = (marker, title) => {
    if (infowindow) {
      infowindow.setContent(
        `<div style="padding:5px; font-size:12px;">${title}</div>`
      );
      infowindow.open(map, marker);
    }
  };

  // 리스트 아이템 클릭 시 동작
  const handleListItemClick = (place) => {
    onSelect({
      placeName: place.place_name,
      address: place.address_name,
      lat: place.y,
      lng: place.x,
    });
    // onClose();
    dispatch(closeModal('map'))
  };

  return (
    <Modal
    type='map'
    >
        <div className="map-modal-content">
          <div className="map-search">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && searchPlaces()}
              placeholder="장소를 검색하세요"
            />
            <button onClick={searchPlaces}>검색</button>
          </div>

          <div className="map-container">
            <div id="map" ref={mapRef} style={{ width: "100%", height: "400px" }} />
            <ul id="placesList" className="places-list">
              {places.map((place, i) => (
                <li
                  key={i}
                  className="item"
                  onClick={() => handleListItemClick(place)}
                  onMouseOver={() => displayInfowindow(markers[i], place.place_name)}
                  onMouseOut={() => infowindow && infowindow.close()}
                >
                  <span className={`markerbg marker_${i + 1}`}></span>
                  <div className="info">
                    <h5>{place.place_name}</h5>
                    {place.road_address_name ? (
                      <>
                        <span>{place.road_address_name}</span>
                        <span className="jibun gray">{place.address_name}</span>
                      </>
                    ) : (
                      <span>{place.address_name}</span>
                    )}
                    <span className="tel">{place.phone}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <button className="close-button" onClick={() => dispatch(closeModal('map'))}>
            닫기
          </button>
        </div>
    </Modal>
  );
};

export default MapModal;
