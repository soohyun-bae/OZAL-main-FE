import React, { useState, useEffect, useCallback } from "react";
import "../style/MapModal.scss";

const MapModal = ({ onClose, onSelect }) => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [infowindow, setInfowindow] = useState(null);
  const [keyword, setKeyword] = useState("");

  // 지도 초기화
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3,
    };
    const mapInstance = new window.kakao.maps.Map(container, options);
    const infowindowInstance = new window.kakao.maps.InfoWindow({ zIndex: 1 });

    setMap(mapInstance);
    setInfowindow(infowindowInstance);
  }, []);

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
      displayPlaces(data);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
    }
  };

  // 검색 결과 표시
  const displayPlaces = (places) => {
    const listEl = document.getElementById("placesList");
    const bounds = new window.kakao.maps.LatLngBounds();

    // 기존 마커 제거
    removeMarker();
    removeAllChildNods(listEl);

    places.forEach((place, i) => {
      const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = addMarker(placePosition, i);
      const itemEl = getListItem(i, place);

      bounds.extend(placePosition);

      // 마커와 목록 이벤트
      (function (marker, title) {
        window.kakao.maps.event.addListener(marker, "mouseover", () => {
          displayInfowindow(marker, title);
        });

        window.kakao.maps.event.addListener(marker, "mouseout", () => {
          infowindow.close();
        });

        itemEl.onmouseout = () => {
          infowindow.close();
        };

        itemEl.onclick = () => {
          onSelect({
            placeName: place.place_name,
            address: place.address_name,
            lat: place.y,
            lng: place.x,
          });
          onClose();
        };
      })(marker, place.place_name);

      listEl.appendChild(itemEl);
    });

    map.setBounds(bounds);
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
      position: position,
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

  return (
    <div className="map-modal">
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
          <div id="map" style={{ width: "100%", height: "400px" }} />
          <div id="placesList" className="places-list" />
        </div>

        <button className="close-button" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

// 유틸리티 함수들
const removeAllChildNods = (el) => {
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }
};

const getListItem = (index, place) => {
  const el = document.createElement("li");
  let itemStr = `
    <span class="markerbg marker_${index + 1}"></span>
    <div class="info">
      <h5>${place.place_name}</h5>
  `;

  if (place.road_address_name) {
    itemStr += `
      <span>${place.road_address_name}</span>
      <span class="jibun gray">${place.address_name}</span>
    `;
  } else {
    itemStr += `<span>${place.address_name}</span>`;
  }

  itemStr += `<span class="tel">${place.phone}</span></div>`;
  el.innerHTML = itemStr;
  el.className = "item";

  return el;
};

export default MapModal;
