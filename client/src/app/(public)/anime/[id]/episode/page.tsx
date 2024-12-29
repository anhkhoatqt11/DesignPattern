import React from "react";
import { getSession } from "@/lib/auth";
import EpisodeComponent from "./(components)/EpisodeComponent";

const page = async ({ params }) => {
  const session = await getSession();
  return <EpisodeComponent params={params} session={session} />;
};

export default page;
