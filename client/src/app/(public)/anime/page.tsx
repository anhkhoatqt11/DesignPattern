"use client";

import React from "react";
import BannerCarousel from "../(home)/components/BannerCarousel";
import ListComponent from "./(components)/ListComponent";

const page = () => {
  return (
    <div className="bg-[#141414]">
      <BannerCarousel />
      <ListComponent />
    </div>
  );
};

export default page;
