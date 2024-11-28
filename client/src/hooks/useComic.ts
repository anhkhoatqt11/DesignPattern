import { getRequest, postRequest, putRequest } from "@/lib/fetch";
import toast from "react-hot-toast";

export const useComic = () => {
  const fetchComicBanner = async () => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/comics/getComicBanner`,
    });
    return res;
  };

  const getComicAlbum = async () => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/comics/getComicAlbum`,
    });
    return res;
  };

  const getComicAlbumContent = async (idList) => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/comics/getComicInAlbum?idList=${idList}&limit=20&page=1`,
    });
    return res;
  };

  const getComic = async (id) => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/comics/getComic?comicId=${id}`,
    });
    return res;
  };

  const getChapter = async (id) => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/comics/getDetailComicById?comicId=${id}`,
    });
    return res;
  };

  const getComicAlbumContentAll = async (idList) => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/comics/getComicInAlbum?idList=${idList}&limit=10000&page=1`,
    });
    return res;
  };

  const getRankingTable = async () => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/comics/getRankingTable`,
    });
    return res;
  };

  const getReadingHistories = async (userId) => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/comics/getReadingHistories?userId=${userId}&limit=20&page=1`,
    });
    return res;
  };

  const getNewChapterComic = async () => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/comics/getNewChapterComic`,
    });
    return res;
  };

  const checkUserBanned = async (userId) => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/comics/checkUserBanned?userId=${userId}`,
    });
    return res;
  };

  const checkValidCommentContent = async (content) => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/comics/checkValidCommentContent?content=${content}`,
    });
    return res;
  };

  const banUser = async (userId) => {
    const res = await putRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/comics/banUser`,
      isFormData: false,
      formData: {
        userId,
      },
    });
    return res;
  };

  return {
    fetchComicBanner,
    getComicAlbum,
    getComicAlbumContent,
    getComicAlbumContentAll,
    getRankingTable,
    checkUserBanned,
    checkValidCommentContent,
    banUser,
    getReadingHistories,
    getNewChapterComic,
    getChapter,
    getComic,
  };
};
