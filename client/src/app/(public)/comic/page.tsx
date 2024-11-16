"use client";

import React from "react";
import ComicBannerCarousel from "./(components)/ComicBannerCarousel";
import { ListComponent } from "./(components)/ListComponent";

const page = () => {
  return (
    <div className="bg-[#141414]">
      <ComicBannerCarousel />
      <ListComponent />
    </div>
  );
};

export default page;
