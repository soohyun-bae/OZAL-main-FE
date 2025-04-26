import React from "react";

const ProfileImage = ({ src, className }) => {
  return (
      <img
        src={src}
        alt="프로필 사진"
        className={className}
      />
  );
};

export default ProfileImage;
