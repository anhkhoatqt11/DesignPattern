"use client";

import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { useComic } from "@/hooks/useComic";
import { RankingComicItem } from "./RankingComicItem";

function RankingComic() {
  const { getRankingTable } = useComic();
  const [rankingList, setRankingList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComicRanking = async () => {
      const result = await getRankingTable();
      const transformArray: any[] = [];
      for (let i = 0; i < result?.length; i += 5) {
        transformArray.push([
          result[i],
          result[i + 1],
          result[i + 2],
          result[i + 3],
          result[i + 4],
        ]);
      }
      setRankingList(transformArray);
      setIsLoading(false);
    };
    fetchComicRanking();
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
              🏆 Bảng xếp hạng
            </h2>
            <Link
              href={`/bat-dong-san/loai-hinh-bat-dong-san/`}
              className="z-10"
            >
              <IoIosArrowForward className="text-white w-6 h-6 sm:w-10 sm:h-10" />
            </Link>
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
            slidesPerView={1}
            spaceBetween={14}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              700: {
                slidesPerView: 1,
                spaceBetween: 14,
              },
              900: {
                slidesPerView: 2,
                spaceBetween: 14,
              },
              1100: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1300: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            modules={[Pagination]}
            className="w-full h-auto overflow-visible relative"
          >
            {rankingList?.map((item, index) => (
              <SwiperSlide
                key={index}
                className="h-full relative overflow-visible"
              >
                <Link href={``}>
                  <RankingComicItem item={item} rank={index} />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}
    </>
  );
}

export default RankingComic;
