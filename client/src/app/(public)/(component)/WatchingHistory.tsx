"use client";

import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import { useAnime } from "@/hooks/useAnime";
import { IoIosArrowForward } from "react-icons/io";
import { TopViewItem } from "./TopViewItem";
import { VideoHistoryItem } from "./VideoHistoryItem";

function WatchingHistory() {
  const userId = "65ec67ad05c5cb2ad67cfb3f";
  const { getWatchingHistories } = useAnime();
  const [episodeList, setEpisodeList] = useState();
  const [recordList, setRecordList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWatchingHistoryDetail = async () => {
      if (userId) {
        const result = await getWatchingHistories(userId);
        console.log("🚀 ~ fetchWatchingHistoryDetail ~ result:", result);
        setEpisodeList(result[0]?.detailHistories);
        setRecordList(result[0]?.histories?.watchingMovie);
      }
      setIsLoading(false);
    };
    fetchWatchingHistoryDetail();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="flex h-full items-center justify-center"></div>
      ) : (
        <section
          id="categories"
          aria-labelledby="categories-heading"
          className="space-y-6 py-3 px-8 sm:px-20"
        >
          <div className="flex flex-row gap-3">
            <div className="w-[6px] h-[24px] sm:w-[8px] sm:h-[40px] bg-gradient-to-b from-[#A958FE] to-[#DA5EF0] rounded-full z-10">
              {" "}
            </div>
            <h2 className="text-white text-xl font-bold leading-[1.1] sm:text-3xl z-10">
              Bạn đang xem
            </h2>
          </div>
          <Swiper
            style={
              {
                "--swiper-pagination-bullet-inactive-color": "#999999",
                "--swiper-pagination-bullet-inactive-opacity": "1",
                "--swiper-pagination-color": "#000000",
                "--swiper-pagination-bullet-size": "0px",
                "--swiper-pagination-bullet-width": "0px",
                "--swiper-pagination-bullet-height": "0px",
              } as React.CSSProperties
            }
            slidesPerView={2}
            spaceBetween={14}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              425: {
                slidesPerView: 2,
                spaceBetween: 14,
              },
              700: {
                slidesPerView: 3,
                spaceBetween: 14,
              },
              900: {
                slidesPerView: 4,
                spaceBetween: 14,
              },
              1100: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1300: {
                slidesPerView: 6,
                spaceBetween: 20,
              },
            }}
            modules={[Pagination]}
            className="w-full h-auto overflow-visible relative"
          >
            {episodeList?.map((item) => (
              <SwiperSlide
                key={item?._id}
                className="h-full relative overflow-visible"
              >
                <Link href={``}>
                  <VideoHistoryItem
                    img={item?.coverImage}
                    name={item?.episodeName}
                    progress={
                      (recordList?.find((e) => e.episodeId === item?._id)
                        ?.position /
                        item?.totalTime) *
                      100
                    }
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}
    </>
  );
}

export default WatchingHistory;
