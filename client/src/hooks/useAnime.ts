import { getRequest, postRequest, putRequest } from "@/lib/fetch";
import { baseApiUrl } from "@/lib/utils";
import toast from "react-hot-toast";

export const useAnime = () => {
  const fetchAnimeBanner = async () => {
    const res = await getRequest({
      endPoint: `${baseApiUrl}/api/animes/getAnimeBanner`,
    });
    return res;
  };

  const getAnimeAlbum = async () => {
    const res = await getRequest({
      endPoint: `${baseApiUrl}/api/animes/getAnimeAlbum`,
    });
    return res;
  };

  const getAnimeAlbumContent = async (albumId) => {
    const res = await getRequest({
      endPoint: `${baseApiUrl}/api/animes/getAnimeInAlbum?idAlbum=${albumId}&limit=20&page=1`,
    });
    return res;
  };

  const getAnimeAlbumContentAll = async (albumId) => {
    const res = await getRequest({
      endPoint: `${baseApiUrl}/api/animes/getAnimeInAlbum?idAlbum=${albumId}&limit=10000&page=1`,
    });
    return res;
  };

  const getTopViewAnime = async () => {
    const res = await getRequest({
      endPoint: `${baseApiUrl}/api/animes/getTopViewAnime`,
    });
    return res;
  };

  const getAnimeChapterById = async (animeId) => {
    const res = await getRequest({
      endPoint: `${baseApiUrl}/api/animes/getAnimeChapterById?animeId=${animeId}&limit=20&page=1`,
    });
    return res;
  };

  const getRankingTable = async () => {
    const res = await getRequest({
      endPoint: `${baseApiUrl}/api/animes/getRankingTable`,
    });
    return res;
  };

  const getWatchingHistories = async (userId) => {
    const res = await getRequest({
      endPoint: `${baseApiUrl}/api/animes/getWatchingHistories?userId=${userId}&limit=20&page=1`,
    });
    return res;
  };

  const getAnimeDetailById = async (animeId) => {
    const res = await getRequest({
      endPoint: `${baseApiUrl}/api/animes/getAnimeDetailById?animeId=${animeId}`,
    });
    return res;
  };

  const getAnimeDetailInEpisodePageById = async (animeId) => {
    const res = await getRequest({
      endPoint: `${baseApiUrl}/api/animes/getAnimeDetailInEpisodePageById?animeId=${animeId}`,
    });
    return res;
  };

  const getAnimeEpisodeDetailById = async (episodeId) => {
    const res = await getRequest({
      endPoint: `${baseApiUrl}/api/animes/getAnimeEpisodeDetailById?episodeId=${episodeId}`,
    });
    return res;
  };

  const getAnimeOfEpisode = async (episodeId) => {
    const res = await getRequest({
      endPoint: `${baseApiUrl}/api/animes/getAnimeOfEpisode?episodeId=${episodeId}`,
    });
    return res;
  };

  const getSomeTopViewEpisodes = async () => {
    const res = await getRequest({
      endPoint: `${baseApiUrl}/api/animes/getSomeTopViewEpisodes`,
    });
    return res;
  };

  const getNewEpisodeAnime = async () => {
    const res = await getRequest({
      endPoint: `${baseApiUrl}/api/animes/getNewEpisodeAnime`,
    });
    return res;
  };

  const checkUserHistoryHadSeenEpisode = async (episodeId, userId) => {
    const res = await getRequest({
      endPoint: `${baseApiUrl}/api/animes/checkUserHistoryHadSeenEpisode?episodeId=${episodeId}&userId=${userId}`,
    });
    return res;
  };

  const checkUserHasLikeOrSaveEpisode = async (episodeId, userId) => {
    const res = await getRequest({
      endPoint: `${baseApiUrl}/api/animes/checkUserHasLikeOrSaveEpisode?episodeId=${episodeId}&userId=${userId}`,
    });
    return res;
  };

  const updateUserLikeEpisode = async (episodeId, userId) => {
    const res = await postRequest({
      endPoint: `${baseApiUrl}/api/animes/updateUserLikeEpisode`,
      isFormData: false,
      formData: {
        episodeId,
        userId,
      },
    });
    return res;
  };

  const updateUserSaveEpisode = async (episodeId, userId) => {
    const res = await postRequest({
      endPoint: `${baseApiUrl}/api/animes/updateUserSaveEpisode`,
      isFormData: false,
      formData: {
        episodeId,
        userId,
      },
    });
    return res;
  };

  const updateUserHistoryHadSeenEpisode = async (
    episodeId,
    userId,
    position
  ) => {
    const res = await postRequest({
      endPoint: `${baseApiUrl}/api/animes/updateUserHistoryHadSeenEpisode`,
      isFormData: false,
      formData: {
        episodeId,
        userId,
        position,
      },
    });
    return res;
  };

  const updateEpisodeView = async (episodeId) => {
    const res = await postRequest({
      endPoint: `${baseApiUrl}/api/animes/updateEpisodeView`,
      isFormData: false,
      formData: {
        episodeId,
      },
    });
    return res;
  };

  const getAnimeEpisodeComments = async (episodeId) => {
    const res = await getRequest({
      endPoint: `${baseApiUrl}/api/animes/getAnimeEpisodeComments?episodeId=${episodeId}`,
    });
    return res;
  };

  const addRootEpisodeComment = async (episodeId, userId, content) => {
    const res = await postRequest({
      endPoint: `${baseApiUrl}/api/animes/addRootEpisodeComments`,
      isFormData: false,
      formData: {
        episodeId,
        userId,
        content,
      },
    });
    return res;
  };

  const addChildEpisodeComment = async (
    episodeId,
    commentId,
    userId,
    content
  ) => {
    const res = await putRequest({
      endPoint: `${baseApiUrl}/api/animes/addChildEpisodeComments`,
      isFormData: false,
      formData: {
        episodeId,
        commentId,
        userId,
        content,
      },
    });
    return res;
  };

  const updateUserLikeChildComment = async (
    episodeId,
    userId,
    commentId,
    commentChildId
  ) => {
    const res = await putRequest({
      endPoint: `${baseApiUrl}/api/animes/updateUserLikeChildComment`,
      isFormData: false,
      formData: {
        episodeId,
        userId,
        commentId,
        commentChildId,
      },
    });
    return res;
  };

  const updateUserLikeParentComment = async (episodeId, userId, commentId) => {
    const res = await putRequest({
      endPoint: `${baseApiUrl}/api/animes/updateUserLikeParentComment`,
      isFormData: false,
      formData: {
        episodeId,
        userId,
        commentId,
      },
    });
    return res;
  };

  const getGenres = async () => {
    const res = await getRequest({
      endPoint: `${baseApiUrl}/api/animes/getGenres`,
    });
    return res;
  };

  const searchForAnimes = async ({ searchWord }) => {
    const res = await getRequest({
      endPoint: `${baseApiUrl}/api/animes/searchAnimeAndEpisodes?query=${searchWord}`,
    });
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
    getAnimeDetailInEpisodePageById,
    getAnimeOfEpisode,
    getAnimeEpisodeDetailById,
    getSomeTopViewEpisodes,
    checkUserHistoryHadSeenEpisode,
    checkUserHasLikeOrSaveEpisode,
    updateUserLikeEpisode,
    updateUserSaveEpisode,
    updateUserHistoryHadSeenEpisode,
    updateEpisodeView,
    getAnimeEpisodeComments,
    addRootEpisodeComment,
    addChildEpisodeComment,
    updateUserLikeChildComment,
    updateUserLikeParentComment,
    getWatchingHistories,
    getNewEpisodeAnime,
    getGenres,
    searchForAnimes,
  };
};
