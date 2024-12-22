"use client";


import React from 'react'
import Image from 'next/image'
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useAnime } from '@/hooks/useAnime';
import { useQuery } from '@tanstack/react-query';
import GenresBadageList from './GenresBadageList';
import { useSearchParams } from 'next/navigation';
import { AnimeItem } from '../../(component)/AnimeItem';
import { useComic } from '@/hooks/useComic';
import { ComicItem } from '../../(component)/ComicItem';
import Loader from '@/components/Loader';

const SearchLayout = () => {

    const { getGenres, searchForAnimes } = useAnime();
    const { searchForComics } = useComic();
    const searchParams = useSearchParams();
    const searchWord = searchParams.get("searchWord");

    const { data: animeGenres, isLoading: isAnimeGenresLoading } = useQuery({
        queryKey: ['anime', 'genres'],
        queryFn: async () => {
            const res = await getGenres();
            return res;
        },
    });

    const { data: animeResult, isLoading: isAnimeResultLoading } = useQuery({
        queryKey: ['anime', 'search', searchWord],
        queryFn: async () => {
            const res = await searchForAnimes(searchWord ? { searchWord } : { searchWord: '' });
            console.log(res);
            return res;
        },
    });

    const { data: comicResult, isLoading: isComicResultLoading } = useQuery({
        queryKey: ['comic', 'search', searchWord],
        queryFn: async () => {
            console.log(`searchWord: ${searchWord}`);
            const res = await searchForComics(searchWord ? { searchWord } : { searchWord: '' });
            console.log(res);
            return res;
        }
    });

    if (isAnimeGenresLoading || isAnimeResultLoading || isComicResultLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader />
            </div>
        )
    }



    return (
        <div className="min-h-screen text-white">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="w-full justify-start mb-8 bg-transparent border-b border-gray-800">
                        <TabsTrigger
                            value="all"
                            className="text-lg px-4 py-2 data-[state=active]:text-purple-500 data-[state=active]:border-b-2 data-[state=active]:border-purple-500"
                        >
                            Tất cả
                        </TabsTrigger>
                        <TabsTrigger
                            value="videos"
                            className="text-lg px-4 py-2 data-[state=active]:text-purple-500 data-[state=active]:border-b-2 data-[state=active]:border-purple-500"
                        >
                            Videos ({animeResult?.animeResults?.length})
                        </TabsTrigger>
                        <TabsTrigger
                            value="manga"
                            className="text-lg px-4 py-2 data-[state=active]:text-purple-500 data-[state=active]:border-b-2 data-[state=active]:border-purple-500"
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
                                        <h2 className="text-xl text-gray-400">Videos ({animeResult?.animeResults?.length} Kết Quả)</h2>
                                        <Link href="#" className="text-purple-400 hover:text-purple-300">
                                            Xem tất cả video →
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {animeResult?.animeResults?.map((anime) => (
                                            <AnimeItem img={anime.coverImage} name={anime.movieName} />
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl text-gray-400">
                                            Truyện Tranh ({comicResult?.length || 0} Kết Quả)
                                        </h2>
                                        <Link href="#" className="text-purple-400 hover:text-purple-300">
                                            Xem tất cả truyện tranh →
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        {comicResult?.slice(0, 8).map((comic) => (
                                            <ComicItem img={comic.coverImage} name={comic.comicName} genres={comic.genres} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">CHỦ ĐỀ TÌM KIẾM PHỔ BIẾN</h3>
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
                                <h2 className="text-xl text-gray-400 mb-4">Videos ({animeResult?.animeResults?.length} Kết Quả)</h2>
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
                                <h2 className="text-xl text-gray-400 mb-4">Truyện Tranh ({comicResult?.length || 0} Kết Quả)
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {comicResult?.map((comic) => (
                                        <ComicItem img={comic.coverImage} name={comic.comicName} genres={comic.genres} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default SearchLayout