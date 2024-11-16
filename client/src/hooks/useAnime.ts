import { getRequest, postRequest } from "@/lib/fetch";
import toast from "react-hot-toast";

export const useAnime = () => {
  const fetchAnimeBanner = async () => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/animes/getAnimeBanner`,
    });
    return res;
  };

  const getAnimeAlbum = async () => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/animes/getAnimeAlbum`,
    });
    return res;
  };

  const getAnimeAlbumContent = async (albumId) => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/animes/getAnimeInAlbum?idAlbum=${albumId}&limit=20&page=1`,
    });
    return res;
  };

  const getAnimeAlbumContentAll = async (albumId) => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/animes/getAnimeInAlbum?idAlbum=${albumId}&limit=10000&page=1`,
    });
    return res;
  };

  const getTopViewAnime = async () => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/animes/getTopViewAnime`,
    });
    return res;
  };

  const getAnimeChapterById = async (animeId) => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/animes/getAnimeChapterById?animeId=${animeId}&limit=20&page=1`,
    });
    return res;
  };

  const getRankingTable = async () => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/animes/getRankingTable`,
    });
    return res;
  };

  const getAnimeDetailById = async (animeId) => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/animes/getAnimeDetailById?animeId=${animeId}`,
    });
    return res;
  };

  const fetchAllEventsBySearch = async (page, props = {}) => {
    let endPointUrl = `/api/event?page=${page}&limit=12`;
    const appendParam = (param, value) => {
      if (value !== "" && typeof value !== "undefined") {
        endPointUrl += `&${param}=${value}`;
      }
    };
    Object.keys(props).forEach((prop) => {
      appendParam(prop, props[prop]);
    });
    const res = await getRequest({ endPoint: endPointUrl });
    return res;
  };

  return {
    fetchAnimeBanner,
    getAnimeAlbum,
    getTopViewAnime,
    getAnimeAlbumContent,
    getAnimeAlbumContentAll,
    getAnimeChapterById,
    getRankingTable,
    getAnimeDetailById,

    fetchAllEventsBySearch,
  };
};
