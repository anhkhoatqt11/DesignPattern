"use client";

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Pencil, Trash, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@/hooks/useUser';
import BookmarkItem from './BookmarkItem';
import toast from 'react-hot-toast';
import Loader from '@/components/Loader';

const BookmarkLayout = ({ session }) => {
    const { getBookmarkList, removeBookmark } = useUser();

    const { data: bookmarkList, isLoading: isBookmarkListLoading, refetch: refetchBookmarkList } = useQuery({
        queryKey: ['user', 'bookmark', session.user.id],
        queryFn: async () => {
            const res = await getBookmarkList(session.user.id);
            return res;
        },
    });

    const [isEditing, setIsEditing] = useState(false);
    const [bookmarksToRemove, setBookmarksToRemove] = useState([]);

    const handleEditToggle = () => {
        setIsEditing((prev) => !prev);
        setBookmarksToRemove([]);
    };

    const handleSelectBookmark = (id) => {
        setBookmarksToRemove((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };


    const handleDeleteBookmarks = async () => {
        try {
            // Send a single request with all bookmarks to remove
            await removeBookmark(session.user.id, bookmarksToRemove);

            toast.success('Đã xóa mục yêu thích thành công!');
            setBookmarksToRemove([]);
            setIsEditing(false);
            refetchBookmarkList();
        } catch (error) {
            console.error('Error removing bookmarks:', error);
            toast.error('Có lỗi xảy ra khi xóa mục yêu thích.');
        }
    };

    if (isBookmarkListLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-semibold">Yêu thích</h1>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleEditToggle}
                        className="bg-purple-900/50 hover:bg-purple-900/70 text-white"
                    >
                        {isEditing ? (
                            <X className="h-4 w-4 mr-2" />
                        ) : (
                            <Pencil className="h-4 w-4 mr-2" />
                        )}
                        {isEditing ? 'Hủy' : 'Sửa'}
                    </Button>
                </div>

                <Tabs defaultValue="anime" orientation="vertical" className="grid grid-cols-[200px_1fr] gap-8">
                    <TabsList className="flex flex-col h-auto bg-transparent">
                        <TabsTrigger
                            value="anime"
                            className="justify-start text-lg data-[state=active]:bg-transparent data-[state=active]:text-purple-400"
                        >
                            Anime
                        </TabsTrigger>
                        <TabsTrigger
                            value="truyen"
                            className="justify-start text-lg data-[state=active]:bg-transparent data-[state=active]:text-purple-400"
                        >
                            Truyện
                        </TabsTrigger>
                    </TabsList>

                    <div>
                        <TabsContent value="anime" className="mt-0 border-0">
                            <div className="space-y-4">
                                {bookmarkList[0].animes.map((anime) => (
                                    <div
                                        key={anime._id}
                                        onClick={() => isEditing && handleSelectBookmark(anime._id)}
                                        className={`relative transition-all duration-200 rounded-lg overflow-hidden ${isEditing
                                            ? 'cursor-pointer hover:bg-purple-900/20'
                                            : ''
                                            } ${bookmarksToRemove.includes(anime._id)
                                                ? 'bg-purple-900/40 ring-2 ring-purple-400'
                                                : ''
                                            }`}
                                    >
                                        <BookmarkItem
                                            image={anime.coverImage}
                                            name={anime.episodeName}
                                            genere={anime.owner[0].genreNames
                                                .map((genre) => genre.genreName)
                                                .join(', ')}
                                            description={anime.owner[0].description}
                                        />
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="truyen" className="mt-0 border-0">
                            <div className="space-y-4">
                                {bookmarkList[0].comics.map((comic) => (
                                    <div
                                        key={comic._id}
                                        onClick={() => isEditing && handleSelectBookmark(comic._id)}
                                        className={`relative transition-all duration-200 rounded-lg overflow-hidden ${isEditing
                                            ? 'cursor-pointer hover:bg-purple-900/20'
                                            : ''
                                            } ${bookmarksToRemove.includes(comic._id)
                                                ? 'bg-purple-900/40 ring-2 ring-purple-400'
                                                : ''
                                            }`}
                                    >
                                        <BookmarkItem
                                            image={comic.coverImage}
                                            name={comic.chapterName}
                                            genere="Truyện"
                                            description={`Lượt xem: ${comic.views}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>

                {isEditing && (
                    <div className="mt-4 flex justify-end gap-4">
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleDeleteBookmarks}
                            disabled={!bookmarksToRemove.length}
                        >
                            <Trash className="h-4 w-4 mr-2" />
                            Xóa
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleEditToggle}
                            className="bg-purple-900/50 hover:bg-purple-900/70 text-white"
                        >
                            Hủy
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookmarkLayout;