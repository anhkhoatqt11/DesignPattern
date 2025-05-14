
import { useEffect, useState } from "react";
import { useAnime } from "@/hooks/useAnime";
import { useComic } from "@/hooks/useComic";
import { NotificationFactory } from "@/lib/notification/NotificationFactory";
import { convertUtcToGmtPlus7 } from "@/app/(public)/comic/[id]/(components)/ComicInfo";
import { FiClock } from "react-icons/fi";

export const NotificationItem = ({ item, onClick, router }) => {
  const { getAnimeDetailById, getAnimeOfEpisode } = useAnime();
  const { getComic, getComicOfChapter } = useComic();

  const [handler, setHandler] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const enrichedData = { ...item };

      if (item?.type === "episode") {
        const result = await getAnimeDetailById(item?.sourceId);
        enrichedData.anime = result[0];
      } else if (item?.type === "chapter") {
        const result = await getComic(item?.sourceId);
        enrichedData.comic = result;
      } else if (item?.type === "commentChapter") {
        const result = await getComicOfChapter(item?.sourceId);
        enrichedData.comic = result[0];
      } else {
        const result = await getAnimeOfEpisode(item?.sourceId);
        enrichedData.anime = result[0];
      }

      const factoryHandler = NotificationFactory(enrichedData);
      setHandler(factoryHandler);
    };

    loadData();
  }, [item]);

  if (!handler) return null;

  return (
    <div
      className="w-full bg-[#1f1f1f] rounded-md flex flex-row items-center h-[100px] p-3 pl-5 gap-5"
      onClick={() => {
        onClick();
        router.push(handler.getRedirectUrl());
      }}
    >
      <img
        src={handler.getImage()}
        className="w-[60px] h-[60px] rounded-md object-cover"
        alt="notification"
      />
      <div className="flex flex-col text-white gap-1">
        <p className="text-[15px] font-medium">{item?.message}</p>
        <div className="flex gap-2 text-[13px] text-gray-400">
          <FiClock className="mt-[2px]" />
          <span>{convertUtcToGmtPlus7(item?.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};
