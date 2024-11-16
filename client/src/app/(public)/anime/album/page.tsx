"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { AlbumDetail } from "./(components)/AlbumDetail";
const page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return <AlbumDetail id={id} />;
};

export default page;
