import { getRequest, postRequest } from "@/lib/fetch";
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
    fetchComicBanner,
    getComicAlbum,
    getComicAlbumContent,

    fetchAllEventsBySearch,
  };
};
