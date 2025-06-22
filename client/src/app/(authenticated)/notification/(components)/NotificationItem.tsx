import { useEffect, useState } from "react";
import { useAnime } from "@/hooks/useAnime";
import { useComic } from "@/hooks/useComic";
import { NotificationFactory } from "@/lib/notification/NotificationFactory";
import { INotificationHandler } from "@/lib/notification/INotificationHandler";
import { convertUtcToGmtPlus7 } from "@/app/(public)/comic/[id]/(components)/ComicInfo";
import { FiClock } from "react-icons/fi";

export const NotificationItem = ({ item, onClick, router }) => {
  const { getAnimeDetailById, getAnimeOfEpisode } = useAnime();
  const { getComic, getComicOfChapter } = useComic();
  const [handler, setHandler] = useState<INotificationHandler | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const enrichedData = { ...item };

        switch (item?.type) {
          case "episode": {
            const result = await getAnimeDetailById(item.sourceId);
            enrichedData.anime = result?.[0];
            break;
          }
          case "chapter": {
            const result = await getComic(item.sourceId);
            enrichedData.comic = result;
            break;
          }
          case "commentChapter": {
            const result = await getComicOfChapter(item.sourceId);
            enrichedData.comic = result?.[0];
            break;
          }
          case "commentEpisode": {
            const result = await getAnimeOfEpisode(item.sourceId);
            enrichedData.anime = result?.[0];
            break;
          }
          default: {
            // fallback nếu type không khớp
            enrichedData.anime = null;
            enrichedData.comic = null;
            break;
          }
        }

        const factoryHandler = NotificationFactory(enrichedData);
        setHandler(factoryHandler);
      } catch (err) {
        console.error("Failed to load notification data:", err);
      }
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
        <p className="text-[15px] font-medium">{item?.content}</p>
        <div className="flex gap-2 text-[13px] text-gray-400 items-center">
          <FiClock className="mt-[2px]" />
          <span>{convertUtcToGmtPlus7(item?.sentTime)}</span>
        </div>
      </div>
    </div>
  );
};
