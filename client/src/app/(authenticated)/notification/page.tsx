import React from "react";
import { getSession } from "@/lib/auth";
import { NotificationPage } from "./(components)/NotificationPage";

const page = async () => {
  const session = await getSession();
  return (
    <div className="w-full h-full">
      <NotificationPage session={session} />
    </div>
  );
};

export default page;
