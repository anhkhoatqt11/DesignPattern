"use client";

import Loader from "@/components/Loader";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useAnime } from "@/hooks/useAnime";
import { AnimeItem } from "@/app/(public)/(component)/AnimeItem";

export const AlbumDetail = ({ id }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [albumContent, setAlbumContent] = useState();
  const { getAnimeAlbumContentAll } = useAnime();

  useEffect(() => {
    const fetchAllAnimeAlbumContent = async () => {
      const result = await getAnimeAlbumContentAll(id);
      setAlbumContent(result[0]);
      setIsLoading(false);
    };
    fetchAllAnimeAlbumContent();
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
          {albumContent?.albumName}
        </h2>
      </div>
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-x-5 gap-y-8">
          {albumContent?.detailList?.map((item) => (
            <Link href={`/anime/${item?._id}`} key={item?._id}>
              <AnimeItem img={item?.coverImage} name={item?.movieName} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
