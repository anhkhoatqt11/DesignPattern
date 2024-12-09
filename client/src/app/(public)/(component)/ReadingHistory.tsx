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
import { useComic } from "@/hooks/useComic";
import { ComicHistoryItem } from "./ComicHistoryItem";

function ReadingHistory({session}) {
  const userId = session?.user?.id;
  const { getReadingHistories } = useComic();
  const [chapterList, setChapterList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReadingHistoryDetail = async () => {
      if (userId) {
        const result = await getReadingHistories(userId);
        setChapterList(result[0]?.detailHistories);
      }
      setIsLoading(false);
    };
    fetchReadingHistoryDetail();
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
              Đọc tiếp
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
            slidesPerView={4}
            spaceBetween={14}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              700: {
                slidesPerView: 4,
                spaceBetween: 14,
              },
              900: {
                slidesPerView: 5,
                spaceBetween: 14,
              },
              1100: {
                slidesPerView: 7,
                spaceBetween: 20,
              },
              1300: {
                slidesPerView: 8,
                spaceBetween: 20,
              },
            }}
            modules={[Pagination]}
            className="w-full h-auto overflow-visible relative"
          >
            {chapterList?.map((item) => (
              <SwiperSlide
                key={item?._id}
                className="h-full relative overflow-visible"
              >
                <ComicHistoryItem
                  id={item?._id}
                  img={item?.coverImage}
                  name={item?.chapterName}
                  ownerId={item?.comicOwner[0]?._id}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}
    </>
  );
}

export default ReadingHistory;
