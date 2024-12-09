import React from "react";
import ComicInfo from "./(components)/ComicInfo";
import { getSession } from "@/lib/auth";

export default async function ComicDetailLayout({ params }) {
  const session = await getSession();
  return (
    <div className="w-full h-full">
      <ComicInfo id={params.id} session={session}/>
    </div>
  );
}
