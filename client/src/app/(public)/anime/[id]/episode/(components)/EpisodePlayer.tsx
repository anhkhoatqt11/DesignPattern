"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaThumbsUp } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { BsFillSendFill } from "react-icons/bs";
import { useAnime } from "@/hooks/useAnime";
import toast from "react-hot-toast";
import { useQuest } from "@/hooks/useQuest";
import { EpisodeComment } from "./EpisodeComment";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/hooks/useUser";

const EpisodePlayer = ({ episodeDetail, session }) => {
  const userId = session?.user?.id;
  const {
    checkUserHistoryHadSeenEpisode,
    updateUserHistoryHadSeenEpisode,
    updateEpisodeView,
  } = useAnime();
  const { updateQuestLog } = useQuest();
  const [hasWatchFullAd, setHasWatchFullAd] = useState(false);
  const [adPosition, setAdPosition] = useState(0);
  const adVideoRef = useRef(null);
  const animeVideoRef = useRef(null);
  const [adDuration, setAdDuration] = useState(0);
  const [previousPosition, setPreviousPosition] = useState(0);
  const [viewTimeStack, setViewTimeStack] = useState<number[]>([]);
  const { getUserCoinAndChallenge } = useUser();

  const { data: userCoinAndQCData, refetch: refetchUserCoinAndQCData } =
    useQuery({
      queryKey: ["user", "coinAndQCData", session?.user?.id],
      queryFn: async () => {
        const res = await getUserCoinAndChallenge(session?.user?.id);
        return res;
      },
    });
  // video player .......................
  const onTimeUpdateFunction = () => {
    if (adVideoRef?.current?.currentTime === adVideoRef?.current?.duration)
      setHasWatchFullAd(true);
    else {
      setAdPosition(Math.round(adVideoRef?.current?.currentTime));
      setAdDuration(Math.round(adVideoRef?.current?.duration));
    }
  };

  const onAnimeTimeUpdateFunction = async () => {
    localStorage.setItem(
      "currentVideoPosition",
      animeVideoRef?.current?.currentTime || 0
    );
    const currentVideoPosition = Math.round(
      animeVideoRef?.current?.currentTime
    );
    if (viewTimeStack.length === 16) {
      return;
    }
    if (viewTimeStack.length === 15) {
      refetchUserCoinAndQCData();
      setViewTimeStack([...viewTimeStack, currentVideoPosition]);
      await updateEpisodeView(episodeDetail?._id);
      await updateQuestLog("", {
        id: session?.user?.id,
        questLog: userCoinAndQCData?.questLog,
      });
      return;
    }
    if (
      !viewTimeStack.length ||
      viewTimeStack[viewTimeStack.length - 1] !== currentVideoPosition
    ) {
      if (currentVideoPosition !== viewTimeStack[viewTimeStack.length - 1] + 1)
        setViewTimeStack([currentVideoPosition]);
      else setViewTimeStack([...viewTimeStack, currentVideoPosition]);
    }
  };

  useEffect(() => {
    const getPreviousPositionVideo = async () => {
      const result = await checkUserHistoryHadSeenEpisode(
        episodeDetail?._id,
        userId
      );
      setPreviousPosition(result ? result?.position : 0);
    };
    const updateUserWatchingHistory = async () => {
      const position = localStorage.getItem("currentVideoPosition");
      await updateUserHistoryHadSeenEpisode(
        episodeDetail?._id,
        userId,
        Math.round(position || 0)
      );
    };
    getPreviousPositionVideo();
    return () => {
      if (userId) {
        updateUserWatchingHistory();
      }
    };
  }, []);

  useEffect(() => {
    if (animeVideoRef.current !== null) {
      animeVideoRef.current.currentTime = previousPosition || 0;
    }
  }, [previousPosition, animeVideoRef]);

  // video player ..............................

  return (
    <div>
      <section className="flex flex-row gap-3 px-4">
        <div className="basis-[100%] lg:basis-2/3">
          <Suspense fallback={<p>Loading video...</p>}>
            <div className="w-full h-full rounded overflow-hidden">
              {episodeDetail && (
                <AspectRatio ratio={16 / 9}>
                  <div className="relative">
                    {!hasWatchFullAd && (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={
                          episodeDetail?.advertisementContent[0]?.forwardLink
                        }
                      >
                        <video
                          ref={adVideoRef}
                          width="100%"
                          height="100%"
                          autoPlay
                          muted
                          playsInline
                          className="absolute top-0 left-0 z-10"
                          src={
                            episodeDetail?.advertisementContent[0]?.adVideoUrl
                          }
                          onTimeUpdate={onTimeUpdateFunction}
                        />
                      </a>
                    )}
                    {!hasWatchFullAd && (
                      <div className="absolute w-[200px] p-[10px] rounded-[40px] bg-[#dddddd] text-[16px] font-semibold pl-[20px] top-[20px] left-[20px] z-20">
                        Quảng cáo còn {adDuration - adPosition}s
                      </div>
                    )}
                    <video
                      id="animeVideo"
                      ref={animeVideoRef}
                      width="100%"
                      height="100%"
                      controls
                      className="absolute top-0 left-0 z-0"
                      src={episodeDetail?.content}
                      onTimeUpdate={onAnimeTimeUpdateFunction}
                    />
                  </div>
                </AspectRatio>
              )}
            </div>
          </Suspense>
        </div>
        <div className="hidden lg:block basis-1/3">
          <EpisodeComment episodeId={episodeDetail?._id} session={session} />
        </div>
      </section>
    </div>
  );
};

export default EpisodePlayer;
