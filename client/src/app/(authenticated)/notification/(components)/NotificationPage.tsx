"use client";

import { ComicItem } from "@/app/(public)/(component)/ComicItem";
import Loader from "@/components/Loader";
import { useComic } from "@/hooks/useComic";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { Badge } from "@nextui-org/react";
import { NotificationItem } from "./NotificationItem";

export const NotificationPage = ({ session }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { getNotification, readNotication } = useUser();
  const [notificationList, setNotificationList] = useState([]);
  useEffect(() => {
    const getNoti = async () => {
      const result = await getNotification(session?.user?.id);
      console.log("🚀 ~ getNoti ~ result:", result);
      (result || []).sort(
        (a, b) =>
          new Date(b?.sentTime).getTime() - new Date(a?.sentTime).getTime()
      );
      setNotificationList(result);
      setIsLoading(false);
    };
    getNoti();
  }, []);
  return (
    <div className="flex flex-col gap-3 bg-[#141414] -mt-[50px] md:-mt-[76px] px-[60px] py-[100px]">
      <div className="flex flex-row gap-3 mb-5">
        <h2 className="text-white text-xl font-bold leading-[1.1] sm:text-3xl z-10">
          Thông báo hệ thống
        </h2>
      </div>
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {notificationList?.map((item, index) => (
            <NotificationItem
              key={item?.sentTime}
              item={item}
              router={router}
              onClick={async () => {
                if (item?.status === "sent") {
                  await readNotication(
                    session?.user?.id,
                    notificationList.length - index - 1
                  );
                  setNotificationList(
                    notificationList.map((e) => {
                      if (e === item) {
                        console.log({ ...item, status: "seen" });
                        return { ...item, status: "seen" };
                      } else return e;
                    })
                  );
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
