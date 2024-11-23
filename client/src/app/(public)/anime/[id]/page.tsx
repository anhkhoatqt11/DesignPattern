"use client";

import Loader from "@/components/Loader";
import { useAnime } from "@/hooks/useAnime";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FaPlay } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { FaRegThumbsUp, FaEye, FaClipboardList } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import { TopViewItem } from "../../(component)/TopViewItem";

const page = ({ params }) => {
  const { getAnimeDetailById } = useAnime();
  const [isLoading, setIsLoading] = useState(true);
  const [animeDetail, setAnimeDetail] = useState();

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      const result = await getAnimeDetailById(params.id);
      setAnimeDetail(result[0]);
      console.log("🚀 ~ fetchAnimeDetail ~ result:", result);
      setIsLoading(false);
    };

    fetchAnimeDetail();
  }, []);

  // return <div className="bg-[#141414] h-screen">{params.id}</div>;
  return isLoading ? (
    <div className="bg-[#141414] flex h-screen items-center justify-center -mt-[50px] md:-mt-[76px]">
      <Loader />
    </div>
  ) : (
    <div className="bg-[#141414] pb-[250px] lg:pb-[120px] xl:pb-0 -mt-[50px] md:-mt-[76px] relative">
      <div className="w-full relative hidden sm:block">
        <AspectRatio ratio={16 / 9}>
          <img
            src={animeDetail?.landspaceImage}
            alt={"img"}
            className="brightness-75 object-cover h-full w-full"
          />
        </AspectRatio>
        <div className="absolute inset-0 bg-[#141414] opacity-75" />
      </div>
      <div className="w-full relative block sm:hidden">
        <AspectRatio ratio={3 / 4}>
          <img
            src={animeDetail?.coverImage}
            alt={"img"}
            className="brightness-75 object-cover h-full w-full"
          />
        </AspectRatio>
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/75 to-transparent" />
      </div>
      <div className="w-full sm:px-20 px-8 absolute top-0 right-0 h-full items-center">
        <div className="flex flex-col gap-3 mt-[100px] mr-3">
          <div className="flex flex-row gap-3">
            <div className="hidden sm:block basis-[150px] relative rounded overflow-hidden">
              {/* <AspectRatio ratio={3 / 4}> */}
              <img
                src={animeDetail?.coverImage}
                alt={"img"}
                className="brightness-75 object-cover h-[200px] w-[150px]"
              />
              {/* </AspectRatio> */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className=" transition ease-in-out duration-300 hover:scale-105 bg-white/70 w-[50px] h-[50px] rounded-full flex items-center justify-center">
                  <FaPlay className="w-6 h-6 text-[#da5ef0] ml-1 mt-[2px]" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-2xl font-bold text-white line-clamp-1">
                {animeDetail?.movieName}
              </div>
              <div className="flex flex-row gap-10 mt-2 mb-2 justify-center items-center sm:justify-start sm:items-start">
                <div className="flex flex-col gap-1 justify-center items-center">
                  <FaRegThumbsUp className="text-white" />
                  <p className="text-xs text-[#8E8E8E]">
                    <p className="text-fuchsia-500">
                      {animeDetail?.totalLikes.toLocaleString("de-DE")}
                    </p>{" "}
                    lượt thích
                  </p>
                </div>
                <div className="flex flex-col gap-1 justify-center items-center">
                  <FaEye className="text-white" />
                  <p className="text-xs text-[#8E8E8E]">
                    <p className="text-fuchsia-500">
                      {animeDetail?.totalViews.toLocaleString("de-DE")}
                    </p>{" "}
                    lượt xem
                  </p>
                </div>
                <div className="flex flex-col gap-1 justify-center items-center">
                  <FaClipboardList className="text-white" />
                  <p className="text-xs text-[#8E8E8E]">
                    <p className="text-fuchsia-500">
                      {animeDetail?.episodes?.length}
                    </p>{" "}
                    tập
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-3">
                <p className="text-sm font-medium text-[#8E8E8E]">
                  Dành cho độ tuổi:{" "}
                </p>
                <p className="text-sm font-medium text-violet-500">
                  {animeDetail?.ageFor}
                </p>
              </div>
              <div className="flex flex-row gap-3">
                <p className="text-sm font-medium text-[#8E8E8E]">Thể loại:</p>
                <p className="text-sm font-medium text-fuchsia-500">
                  {convertTagArrayToStr(animeDetail?.genreNames)}
                </p>
              </div>
              <div className="flex flex-row gap-3">
                <p className="text-sm font-medium text-[#8E8E8E]">Phát sóng:</p>
                <p className="text-sm font-medium text-fuchsia-500">
                  {animeDetail?.publishTime}
                </p>
              </div>
              <div className="flex flex-row gap-3">
                <p className="text-sm font-medium text-[#8E8E8E]">
                  Nhà phát hành:
                </p>
                <p className="text-sm font-medium text-white">
                  {animeDetail?.publisher}
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm text-[#8E8E8E] line-clamp-4 xs:line-clamp-8 md:line-clamp-4 lg:line-clamp-6 2xl:line-clamp-8">
            <p className="text-white font-medium">Mô tả: </p>
            {animeDetail?.description}
          </p>
        </div>
      </div>
      <div className="w-full absolute top-[450px] left-0">
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
              Danh sách phát
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
            {animeDetail?.detailEpisodeList?.map((item) => (
              <SwiperSlide
                key={item?._id}
                className="h-full relative overflow-visible"
              >
                <Link href={``}>
                  <TopViewItem
                    img={item?.coverImage}
                    name={item?.episodeName}
                    view={item?.views}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>
    </div>
  );
};

export const convertTagArrayToStr = (genres) =>
  genres?.map((item) => item.genreName).join(", ");

export default page;
