import React from "react";
import BannerCarousel from "./BannerCarousel";
import ListComponent from "./ListComponent";
const ContentSection = () => {
  return (
    <div className="bg-[#141414]">
      <BannerCarousel />
      <ListComponent />
    </div>
  );
};

export default ContentSection;
