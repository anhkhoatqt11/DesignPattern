import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import { TopViewItem } from "@/app/(public)/(component)/TopViewItem";

export const EpisodeOwnerList = ({ listEpisodes, animeId }) => {
  return (
    <div className="w-full">
      <section
        id="categories"
        aria-labelledby="categories-heading"
        className="space-y-6 py-6 px-4"
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
          {listEpisodes?.map((item) => (
            <SwiperSlide
              key={item?._id}
              className="h-full relative overflow-visible"
            >
              <Link href={`/anime/${animeId}/episode?episodeId=${item?._id}`}>
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
  );
};
