"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { TopViewAnimeDetail } from "./(components)/TopViewAnimeDetail";
const page = () => {
  const searchParams = useSearchParams();
  const animeId = searchParams.get("animeId");
  return <TopViewAnimeDetail animeId={animeId} />;
};

export default page;
