"use client";

import Loader from "@/components/Loader";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useAnime } from "@/hooks/useAnime";
import { AnimeItem } from "@/app/(public)/(component)/AnimeItem";
import { TopViewItem } from "@/app/(public)/(component)/TopViewItem";

export const TopViewAnimeDetail = ({ animeId }) => {
  const router = useRouter();
  const { getAnimeChapterById } = useAnime();
  const [animeDetail, setAnimeDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodeDetail = async () => {
      const result = await getAnimeChapterById(animeId);
      setAnimeDetail(result[0]);
      setIsLoading(false);
    };
    fetchEpisodeDetail();
  }, []);
  return (
    <div className="flex flex-col gap-3 bg-[#141414] -mt-[50px] md:-mt-[76px] px-[60px] py-[100px]">
      <div className="flex flex-row gap-3 mb-5">
        <IoIosArrowBack
          className="text-[#da5ef0] w-6 h-6 sm:w-10 sm:h-10"
          onClick={() => {
            router.back();
          }}
        />
        <h2 className="text-white text-xl font-bold leading-[1.1] sm:text-3xl z-10">
          {animeDetail?.movieName}
        </h2>
      </div>
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-5 gap-y-8">
          {animeDetail?.movieEpisodes?.map((item) => (
            <Link
              href={`/anime/${animeId}/episode?episodeId=${item?._id}`}
              key={item?._id}
            >
              <TopViewItem
                img={item?.coverImage}
                name={item?.episodeName}
                view={item?.views}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
