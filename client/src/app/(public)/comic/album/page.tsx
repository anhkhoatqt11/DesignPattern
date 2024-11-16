"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { AlbumDetail } from "./(components)/AlbumDetail";
const page = () => {
  const searchParams = useSearchParams();
  const albumName = searchParams.get("name");
  const idList = searchParams.get("list");
  return <AlbumDetail albumName={albumName} idList={idList} />;
};

export default page;
