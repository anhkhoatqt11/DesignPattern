"use client";

import React from "react";
import BannerCarousel from "./components/BannerCarousel";
import ListComponent from "./components/ListComponent";
import { getSession } from "@/lib/auth";

const page = async () => {
  const Session = await getSession();
  return (
    <div className="bg-[#141414]">
      <BannerCarousel />
      <ListComponent session={session} />
    </div>
  );
};

export default page;
