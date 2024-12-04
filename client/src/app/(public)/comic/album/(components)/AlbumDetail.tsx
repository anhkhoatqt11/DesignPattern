"use client";

import { ComicItem } from "@/app/(public)/(component)/ComicItem";
import Loader from "@/components/Loader";
import { useComic } from "@/hooks/useComic";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export const AlbumDetail = ({ albumName, idList }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [listAlbumContent, setListAlbumContent] = useState();
  const { getComicAlbumContentAll } = useComic();

  useEffect(() => {
    const fetchAllComicAlbumContent = async () => {
      const result = await getComicAlbumContentAll(idList);
      setListAlbumContent(result);
      setIsLoading(false);
    };
    fetchAllComicAlbumContent();
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
          {albumName}
        </h2>
      </div>
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-x-5 gap-y-8">
          {listAlbumContent?.map((item) => (
            <Link href={`/comic/${item[0]?._id}`} key={item[0]?._id}>
              <ComicItem
                img={item[0]?.coverImage}
                name={item[0]?.comicName}
                genres={item[0]?.genreName}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
