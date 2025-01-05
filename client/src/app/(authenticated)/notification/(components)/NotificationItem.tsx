import { convertUtcToGmtPlus7 } from "@/app/(public)/comic/[id]/(components)/ComicInfo";
import { useAnime } from "@/hooks/useAnime";
import { useComic } from "@/hooks/useComic";
import { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";
export const NotificationItem = ({ item, onClick, router }) => {
  const [imgSrc, setImgSrc] = useState("/loadingcomicimage.png");
  const [ownerId, setOwnerId] = useState(0);
  const { getAnimeDetailById, getAnimeOfEpisode } = useAnime();
  const { getComic, getComicOfChapter } = useComic();

  useEffect(() => {
    const fetchNotificationDetail = async () => {
      if (item?.type === "episode") {
        const result = await getAnimeDetailById(item?.sourceId);
        setImgSrc(result[0]?.landspaceImage || "/loadingcomicimage.png");
      } else if (item?.type === "chapter") {
        const result = await getComic(item?.sourceId);
        setImgSrc(result?.landspaceImage || "/loadingcomicimage.png");
      } else if (item?.type === "commentChapter") {
        const result = await getComicOfChapter(item?.sourceId);
        console.log(
          "🚀 ~ fetchNotificationDetail ~ result: comment Chapter",
          result
        );
        setOwnerId(result[0]?._id);
        setImgSrc("https://cdn-icons-png.flaticon.com/512/4387/4387152.png");
      } else {
        const result = await getAnimeOfEpisode(item?.sourceId);
        setOwnerId(result[0]?._id);
        setImgSrc("https://cdn-icons-png.flaticon.com/512/4387/4387152.png");
        console.log("🚀 ~ fetchNotificationDetail ~ result: episode", result);
      }
    };
    fetchNotificationDetail();
  }, []);
  return (
    <div
      className="w-full bg-[#1f1f1f] rounded-md flex flex-row items-center h-[100px] p-3 pl-5 gap-5"
      onClick={() => {
        onClick();
        if (item?.type === "chapter") {
          router.push(`/comic/${item?.sourceId}`);
        } else if (item?.type === "episode") {
          router.push(`/anime/${item?.sourceId}`);
        } else if (item?.type === "commentChapter") {
          router.push(`/comic/${ownerId}/chapter?chapterId=${item?.sourceId}`);
        } else {
          router.push(`/anime/${ownerId}/episode?episodeId=${item?.sourceId}`);
        }
      }}
    >
      <div
        className={`w-3 h-3 rounded-full ${
          item?.status === "sent" ? "bg-[#DA5EF0]" : "bg-transparent"
        }`}
      ></div>
      <img
        src={imgSrc}
        alt={"img"}
        className="object-cover h-16 w-16 rounded-md transition-transform group-hover:scale-110 transition ease-in-out duration-300 hover:scale-105"
      />
      <div className="flex flex-col gap-2">
        <span className="text-white text-lg text-semibold">
          {item?.content}
        </span>
        <span className="text-gray-500 flex flex-row gap-1 text-medium text-sm items-center">
          <FiClock />
          {convertUtcToGmtPlus7(item?.sentTime)}
        </span>
      </div>
    </div>
  );
};
