import React from "react";
import ComicInfo from "./(components)/ComicInfo";

export default async function ComicDetailLayout({ params }) {
  return (
    <div className="w-full h-full">
      <ComicInfo id={params.id} />
    </div>
  );
}
