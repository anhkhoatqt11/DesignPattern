"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAnime } from "@/hooks/useAnime";
import { useQuery } from "@tanstack/react-query";
import GenresBadageList from "./GenresBadageList";
import { useSearchParams } from "next/navigation";
import { AnimeItem } from "../../(component)/AnimeItem";
import { useComic } from "@/hooks/useComic";
import { ComicItem } from "../../(component)/ComicItem";
import Loader from "@/components/Loader";
import { IoMdArrowRoundForward } from "react-icons/io";

const SearchLayout = () => {
  const { getGenres, searchForAnimes } = useAnime();
  const { searchForComics } = useComic();
  const searchParams = useSearchParams();
  const searchWord = searchParams.get("searchWord");

  // const { data: animeGenres, isLoading: isAnimeGenresLoading } = useQuery({
  //   queryKey: ["anime", "genres"],
  //   queryFn: async () => {
  //     const res = await getGenres();
  //     return res;
  //   },
  // });

  const { data: animeResult, isLoading: isAnimeResultLoading } = useQuery({
    queryKey: ["anime", "search", searchWord],
    queryFn: async () => {
      const res = await searchForAnimes(
        searchWord ? { searchWord } : { searchWord: "" }
      );
      console.log(res);
      return res;
    },
  });

  const { data: comicResult, isLoading: isComicResultLoading } = useQuery({
    queryKey: ["comic", "search", searchWord],
    queryFn: async () => {
      console.log(`searchWord: ${searchWord}`);
      const res = await searchForComics(
        searchWord ? { searchWord } : { searchWord: "" }
      );
      console.log(res);
      return res;
    },
  });

  const animeGenres = [
    { id: 1, genreName: "Cuộc chiến tỏ tình" },
    { id: 2, genreName: "SPYXFAMILY" },
    { id: 3, genreName: "Nhật ký" },
    { id: 4, genreName: "Lớp học đề cao thực lực" },
    { id: 5, genreName: "High cards" },
  ];

  if (isAnimeResultLoading || isComicResultLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="all" className="w-full rounded-none">
          <TabsList className="rounded-none w-full justify-start mb-8 bg-transparent border-b border-zinc-800">
            <TabsTrigger
              value="all"
              className="rounded-none text-lg px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:text-[#DA5EF0] data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-solid data-[state=active]:border-[#DA5EF0]"
            >
              Tất cả
            </TabsTrigger>
            <TabsTrigger
              value="videos"
              className="rounded-none text-lg px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:text-[#DA5EF0] data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-solid data-[state=active]:border-[#DA5EF0]"
            >
              Videos ({animeResult?.animeResults?.length})
            </TabsTrigger>
            <TabsTrigger
              value="manga"
              className="rounded-none text-lg px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:text-[#DA5EF0] data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-solid data-[state=active]:border-[#DA5EF0]"
            >
              Truyện tranh ({comicResult?.length || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Videos Section */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl text-white font-medium">
                      Videos ({animeResult?.animeResults?.length} Kết Quả)
                    </h2>
                    <Link
                      href="#"
                      className="group text-[#A958FE] flex flex-row gap-2 items-center "
                    >
                      Xem tất cả video
                      <IoMdArrowRoundForward className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-5 2xl:grid-cols-6 gap-4">
                    {animeResult?.animeResults?.map((anime) => (
                      <AnimeItem
                        img={anime.coverImage}
                        name={anime.movieName}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl text-white font-medium">
                      Truyện Tranh ({comicResult?.length || 0} Kết Quả)
                    </h2>
                    <Link
                      href="#"
                      className="group text-[#A958FE] flex flex-row gap-2 items-center "
                    >
                      Xem tất cả truyện tranh
                      <IoMdArrowRoundForward className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-5 2xl:grid-cols-6 gap-4">
                    {comicResult?.slice(0, 8).map((comic) => (
                      <ComicItem
                        img={comic.coverImage}
                        name={comic.comicName}
                        genres={comic.genres}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Tìm kiếm thường xuyên
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <GenresBadageList genresItem={animeGenres} />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="videos" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <h2 className="text-xl text-gray-400 mb-4">
                  Videos ({animeResult?.animeResults?.length} Kết Quả)
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {animeResult?.animeResults?.map((anime) => (
                    <AnimeItem img={anime.coverImage} name={anime.movieName} />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="manga" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <h2 className="text-xl text-gray-400 mb-4">
                  Truyện Tranh ({comicResult?.length || 0} Kết Quả)
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {comicResult?.map((comic) => (
                    <ComicItem
                      img={comic.coverImage}
                      name={comic.comicName}
                      genres={null}
                    />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SearchLayout;
