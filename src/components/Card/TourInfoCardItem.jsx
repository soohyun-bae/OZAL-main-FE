import React from "react";
import { useFetchDetailInfoQuery } from "../../RTK/tour/tourApi";
import Card from "./Card";

const TourInfoCardItem = ({ i }) => {
  const { data: detailInfoData, isLoading: detailLoading } =
    useFetchDetailInfoQuery(i.contentid, {
      skip: !i.contentid,
    });

  const detailInfo = detailInfoData?.[0];

  return (
    <div>
      <Card
        key={i.contentid}
        to={`/travel-info/detail/${i.contentid}`}
        src={i.firstimage2}
        title={i.title}
        info={i.addr1}
        content={
          detailLoading ? "Loading..." : detailInfo?.overview || "overview"
        }
      />
    </div>
  );
};

export default TourInfoCardItem;
