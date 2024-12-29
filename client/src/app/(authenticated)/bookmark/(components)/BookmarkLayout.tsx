"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/hooks/useUser";
import BookmarkItem from "./BookmarkItem";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

const BookmarkLayout = ({ session }) => {
  const { getBookmarkList, removeBookmark } = useUser();

  const {
    data: bookmarkList,
    isLoading: isBookmarkListLoading,
    refetch: refetchBookmarkList,
  } = useQuery({
    queryKey: ["user", "bookmark", session.user.id],
    queryFn: async () => {
      const res = await getBookmarkList(session.user.id);
      return res;
    },
  });
  console.log("🚀 ~ BookmarkLayout ~ bookmarkList:", bookmarkList);

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

      toast.success("Đã xóa mục yêu thích thành công!");
      setBookmarksToRemove([]);
      setIsEditing(false);
      refetchBookmarkList();
    } catch (error) {
      console.error("Error removing bookmarks:", error);
      toast.error("Có lỗi xảy ra khi xóa mục yêu thích.");
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
          <div className="flex flex-row gap-3">
            {isEditing && (
              <div className="flex justify-end gap-4">
                <Button
                  variant={"outline"}
                  color="success"
                  size="sm"
                  onClick={handleDeleteBookmarks}
                  disabled={!bookmarksToRemove.length}
                  className="border-1 border-red-500 bg-transparent text-red-500 hover:text-white hover:bg-red-500"
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Xóa
                </Button>
              </div>
            )}
            <Button
              variant={"outline"}
              color="success"
              size="sm"
              onClick={handleEditToggle}
              className="border-1 border-emerald-400 bg-transparent text-emerald-400 hover:text-white hover:bg-emerald-400"
            >
              {isEditing ? (
                <X className="h-4 w-4 mr-2" />
              ) : (
                <Pencil className="h-4 w-4 mr-2" />
              )}
              {isEditing ? "Hủy" : "Sửa"}
            </Button>
          </div>
        </div>

        <Tabs
          defaultValue="anime"
          orientation="vertical"
          className="grid grid-cols-[200px_1fr] gap-8"
        >
          <TabsList className="flex flex-col justify-start items-start h-auto bg-transparent">
            <TabsTrigger
              value="anime"
              className="justify-start p-0 py-3 text-start text-lg data-[state=active]:bg-transparent data-[state=active]:text-[#DA5EF0] data-[state=active]:border-l-2 border-[#DA5EF0]"
            >
              Anime
            </TabsTrigger>
            <TabsTrigger
              value="truyen"
              className="justify-start p-0 py-3 text-start text-lg data-[state=active]:bg-transparent data-[state=active]:text-[#DA5EF0] data-[state=active]:border-l-2 border-[#DA5EF0]"
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
                    className={`group relative rounded-lg overflow-hidden`}
                  >
                    <div
                      className={`${
                        bookmarksToRemove.includes(anime._id)
                          ? "bg-gradient-to-r "
                          : ""
                      } ${
                        isEditing
                          ? "cursor-pointer group-hover:bg-gradient-to-l"
                          : "group-hover:bg-blue-500 group-hover:scale-105"
                      } from-emerald-500 to-blue-500 bg-right transition ease-in-out duration-1000 p-20 rounded-lg`}
                    >
                      "
                    </div>
                    <div className="m-[1px] absolute inset-0  bg-[#141414] rounded-lg">
                      <BookmarkItem
                        image={anime.coverImage}
                        name={anime.episodeName}
                        ownerName={anime.owner[0].movieName}
                        genere={anime.owner[0].genreNames}
                      />
                    </div>
                  </div>
                ))}
                {!bookmarkList[0].animes?.length && (
                  <div className="w-full flex flex-col justify-center items-center">
                    <img src="/empty-box.png" className="w-1/2" />
                    <span className="font-semibold text-lg">
                      Chưa có bộ anime nào
                    </span>
                    <span className="text-gray-500 text-center">
                      Hãy thêm anime vào danh sách yêu thích của bạn
                    </span>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="truyen" className="mt-0 border-0">
              <div className="space-y-4">
                {bookmarkList[0].comics.map((comic) => (
                  <div
                    key={comic._id}
                    onClick={() => isEditing && handleSelectBookmark(comic._id)}
                    className={`group relative rounded-lg overflow-hidden`}
                  >
                    <div
                      className={`${
                        bookmarksToRemove.includes(comic._id)
                          ? "bg-gradient-to-r "
                          : ""
                      } ${
                        isEditing
                          ? "cursor-pointer group-hover:bg-gradient-to-l"
                          : "group-hover:bg-blue-500"
                      } from-emerald-500 to-blue-500 bg-right transition ease-in-out duration-1000 p-20 rounded-lg`}
                    >
                      "
                    </div>
                    <div className="m-[1px] absolute inset-0  bg-[#141414] rounded-lg">
                      <BookmarkItem
                        image={comic.coverImage}
                        name={comic.chapterName}
                        ownerName={comic.owner[0].comicName}
                        genere={comic.owner[0].genreNames}
                      />
                    </div>
                  </div>
                ))}
                {!bookmarkList[0].comics?.length && (
                  <div className="w-full flex flex-col justify-center items-center">
                    <img src="/empty-box.png" className="w-1/2" />
                    <span className="font-semibold text-lg">
                      Chưa có bộ truyện nào
                    </span>
                    <span className="text-gray-500 text-center">
                      Hãy thêm truyện vào danh sách yêu thích của bạn
                    </span>
                  </div>
                )}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default BookmarkLayout;
