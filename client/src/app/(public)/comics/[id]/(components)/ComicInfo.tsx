"use client";

import { useComic } from '@/hooks/useComic';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Image } from '@nextui-org/react';
import { Book, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Loader from '@/components/Loader';


function convertUtcToGmtPlus7(utcString) {
    const utcDate = new Date(utcString);
    const gmtPlus7Offset = 7 * 60;
    const localDate = new Date(utcDate.getTime() + gmtPlus7Offset * 60 * 1000);
    const formattedDate = localDate
        .toISOString()
        .replace("T", " ")
        .replace(/\.\d+Z$/, "");
    return formattedDate;
}

const ComicInfo = ({ id }) => {
    const { getComic, getChapter } = useComic();

    const { data, isLoading } = useQuery({
        queryKey: ['comic', id],
        queryFn: async () => {
            const res = await getChapter(id);
            console.log(res);
            return res;
        },
    });



    // Ensure data is available before rendering
    if (isLoading || !data) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div
            className="relative min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white"
        >
            {/* Blurred Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
                style={{
                    backgroundImage: `url(${data[0].landscapeImage})`,
                    filter: 'blur(10px)',
                }}
            ></div>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto py-8 px-4">
                <div className="grid gap-8 md:grid-cols-[300px_1fr]">
                    {/* Comic Cover */}
                    <div className="relative">
                        <Image
                            src={data[0].coverImage}
                            alt="Comic Cover"
                            width={300}
                            height={400}
                            className="rounded-lg"
                        />
                    </div>

                    {/* Comic Details */}
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold">{data[0].comicName}</h1>

                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Heart className="h-5 w-5 text-purple-500" />
                                <span>{data[0].totalLikes} Thích</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Eye className="h-5 w-5 text-purple-500" />
                                <span>{data[0].totalViews} lượt xem</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Book className="h-5 w-5 text-purple-500" />
                                <span>{data[0].chapterList.length} Chương</span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            {/* "ĐỌC NGAY" button with gradient and animation */}
                            <Button
                                variant="outline"
                                className="bg-gradient-to-r border-purple-500 from-purple-500 via-indigo-500 to-blue-500 w-full px-6 py-2 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
                            >
                                ĐỌC NGAY
                            </Button>

                            {/* "CHƯƠNG MỚI NHẤT" button with outline, animation */}
                            <Button
                                variant="outline"
                                className="border-purple-500 text-purple-500 w-full px-6 py-2 font-bold hover:bg-purple-500 hover:text-white hover:shadow-lg hover:scale-105  transition-all duration-300"
                            >
                                CHƯƠNG MỚI NHẤT
                            </Button>

                            {/* "+ YÊU THÍCH" button with updated colors and size */}
                            <Button
                                variant="outline"
                                className="border-zinc-600 text-gray-800 w-full px-6 py-2 font-bold hover:bg-zinc-700 hover:text-white hover:shadow-lg hover:scale-105  transition-all duration-300"
                            >
                                + YÊU THÍCH
                            </Button>
                        </div>


                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <span className="text-zinc-400">Tác Giả:</span>
                                <Link href="#" className="text-purple-500">
                                    {data[0].author}
                                </Link>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-zinc-400">Họa Sĩ:</span>
                                <Link href="#" className="text-purple-500">
                                    {data[0].artist}
                                </Link>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-zinc-400">Thể Loại:</span>
                                <Link href="#" className="text-purple-500">
                                    Tình Cảm
                                </Link>
                                ,
                                <Link href="#" className="text-purple-500">
                                    Đời Thường
                                </Link>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-zinc-400">Xếp Hạng:</span>
                                <span>13+</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h2 className="font-bold">Mô Tả:</h2>
                            <p className="text-zinc-300 line-clamp-3">
                                {data[0].description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Chapter List */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold pb-4">{data[0].detailChapterList.length} Chương</h2>
                    <div className="space-y-6"> {/* Increased vertical spacing */}
                        {data[0].detailChapterList.map((chapter, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between rounded-lg bg-zinc-800 px-6 py-4"
                            // Increased padding
                            >
                                <div className="flex items-center gap-6">
                                    {/* Increased gap */}
                                    <Image
                                        src={chapter.coverImage}
                                        alt={`Chapter ${index + 1} Cover`}
                                        width={80}
                                        height={100}
                                        // Increased dimensions
                                        className="rounded-lg"
                                    // Larger border-radius
                                    />
                                    <div>
                                        <span className="block text-lg font-bold">
                                            {chapter.chapterName}
                                        </span>
                                        {/* Increased font size */}
                                        <span className="block text-md text-zinc-400">
                                            {convertUtcToGmtPlus7(chapter.publicTime)}
                                        </span>
                                        {/* Slightly increased font size */}
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    {/* Increased gap */}
                                    <span className="text-md text-zinc-400">
                                        {chapter.views} lượt xem
                                    </span>
                                    {/* Slightly larger font size */}
                                    <Button className="text-lg text-purple-500" variant="link">
                                        Đọc
                                    </Button>
                                    {/* Larger button text */}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ComicInfo;
