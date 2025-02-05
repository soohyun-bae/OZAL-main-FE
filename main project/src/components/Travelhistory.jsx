import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TravelHistory = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  // 카카오맵 초기화
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_MAP_API_KEY&libraries=services&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울 시청
          level: 3,
        };
        const newMap = new window.kakao.maps.Map(container, options);
        setMap(newMap);

        // 장소 검색 객체 생성
        const ps = new window.kakao.maps.services.Places();

        // 검색 결과 처리 함수
        const placesSearchCB = (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(
              result[0].y,
              result[0].x
            );

            // 기존 마커 제거
            if (marker) marker.setMap(null);

            // 새 마커 생성
            const newMarker = new window.kakao.maps.Marker({
              map: newMap,
              position: coords,
            });

            setMarker(newMarker);
            newMap.setCenter(coords);
          }
        };

        // 위치 검색 이벤트 핸들러
        const searchLocation = (query) => {
          if (!query.trim()) return;
          ps.keywordSearch(query, placesSearchCB);
        };

        // 검색 input의 이벤트 리스너
        const searchInput = document.getElementById("location-search");
        if (searchInput) {
          searchInput.addEventListener("change", (e) =>
            searchLocation(e.target.value)
          );
        }
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Quill 에디터 모듈 설정
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  // 여행 기록 저장 핸들러
  const handleSubmit = () => {
    // TODO: 실제 저장 로직 구현
    console.log({
      title,
      content,
      location,
      coordinates: marker
        ? {
            lat: marker.getPosition().getLat(),
            lng: marker.getPosition().getLng(),
          }
        : null,
    });
  };

  return (
    <Card className="max-w-4xl mx-auto my-8">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* 여행 제목 입력 */}
          <div>
            <Input
              type="text"
              placeholder="여행 제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl font-bold w-full mb-4"
            />
          </div>

          {/* 여행 위치 검색 */}
          <div>
            <Input
              id="location-search"
              type="text"
              placeholder="여행 위치를 검색하세요"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mb-4"
            />
            {/* 지도 표시 영역 */}
            <div id="map" className="w-full h-[300px] mb-4 rounded-lg"></div>
          </div>

          {/* 여행 내용 에디터 */}
          <div className="min-h-[400px]">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              placeholder="여행 이야기를 들려주세요..."
              className="h-[350px]"
            />
          </div>

          {/* 버튼 영역 */}
          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline">취소</Button>
            <Button onClick={handleSubmit}>여행 기록 저장</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TravelHistory;
