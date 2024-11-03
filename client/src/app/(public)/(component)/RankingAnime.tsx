"use client";

import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import { useAnime } from "@/hooks/useAnime";
import { IoIosArrowForward } from "react-icons/io";
import { RankingAnimeItem } from "./RankingAnimeItem";

function RankingAnime() {
  const { getRankingTable } = useAnime();
  const [rankingList, setRankingList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnimeRanking = async () => {
      const result = await getRankingTable();
      const transformArray = [
        result[0],
        ...result?.slice(1).reduce((acc, curr, index) => {
          if (index % 2 === 0) {
            acc.push([curr]);
          } else {
            acc[acc.length - 1].push(curr);
          }
          return acc;
        }, []),
      ];
      console.log("🚀 ~ fetchAnimeRanking ~ result:", result);
      setRankingList(transformArray);
      setIsLoading(false);
    };
    fetchAnimeRanking();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="flex h-full items-center justify-center"></div>
      ) : (
        <section
          id="categories"
          aria-labelledby="categories-heading"
          className="space-y-6 py-3 px-20"
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
            slidesPerView={2}
            spaceBetween={14}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              700: {
                slidesPerView: 2,
                spaceBetween: 14,
              },
              900: {
                slidesPerView: 3,
                spaceBetween: 14,
              },
              1100: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1300: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            modules={[Pagination]}
            className="w-full h-auto overflow-visible relative"
          >
            {rankingList?.map((item, index) => (
              <SwiperSlide className="h-full relative overflow-visible">
                <Link href={``}>
                  <RankingAnimeItem item={item} rank={index} />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}
    </>
  );
}

export default RankingAnime;
