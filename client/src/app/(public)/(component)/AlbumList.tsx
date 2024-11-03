"use client";
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

function AlbumList({ albumName, albumList }) {
  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="space-y-6 px-20"
    >
      <div className="flex flex-row gap-3">
        <div className="w-[6px] h-[24px] sm:w-[8px] sm:h-[40px] bg-gradient-to-b from-[#A958FE] to-[#DA5EF0] rounded-full z-10">
          {" "}
        </div>
        <h2 className="text-white text-xl font-bold leading-[1.1] sm:text-3xl z-10">
          {albumName}
        </h2>
        <Link href={`/bat-dong-san/loai-hinh-bat-dong-san/`} className="z-10">
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
            slidesPerView: 6,
            spaceBetween: 20,
          },
          1300: {
            slidesPerView: 7,
            spaceBetween: 20,
          },
        }}
        modules={[Pagination]}
        className="w-full h-auto overflow-visible relative"
      >
        {albumList?.map((collection) => (
          <SwiperSlide className="h-full relative mb-16 overflow-visible">
            <Link href={`/bat-dong-san/loai-hinh-bat-dong-san/`}></Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default AlbumList;
