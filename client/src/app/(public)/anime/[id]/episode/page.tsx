"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import EpisodePlayer from "./(components)/EpisodePlayer";
import { EpisodeInformation } from "./(components)/EpisodeInformation";
import { useAnime } from "@/hooks/useAnime";
import { EpisodeOwnerList } from "./(components)/EpisodeOwnerList";
import { SuggestionByView } from "./(components)/SuggestionByView";
import Loader from "@/components/Loader";

const page = ({ params }) => {
  const searchParams = useSearchParams();

  const animeId = params.id;
  const episodeId = searchParams.get("episodeId");
  const [animeDetail, setAnimeDetail] = useState();
  const [episodeDetail, setEpisodeDetail] = useState();
  const [isLoadingAnimeDetail, setIsLoadingAnimeDetail] = useState(true);
  const [isLoadingEpisodeDetail, setIsLoadingEpisodeDetail] = useState(true);
  const { getAnimeDetailInEpisodePageById, getAnimeEpisodeDetailById } =
    useAnime();
  useEffect(() => {
    const fetchAnimeDetail = async () => {
      const result = await getAnimeDetailInEpisodePageById(animeId);
      console.log("🚀 ~ fetchAnimeDetail ~ result:", result);
      setIsLoadingAnimeDetail(false);
      setAnimeDetail(result[0]);
    };
    const fetchEpisodeDetail = async () => {
      const result = await getAnimeEpisodeDetailById(episodeId);
      console.log("🚀 ~ fetchEpisodeDetail ~ result:", result);
      setIsLoadingEpisodeDetail(false);
      setEpisodeDetail(result[0]);
    };

    fetchAnimeDetail();
    fetchEpisodeDetail();
  }, []);
  return (
    <div className="bg-black -mt-[50px] md:-mt-[76px] pt-[60px] md:pt-[86px]">
      {isLoadingAnimeDetail || isLoadingEpisodeDetail ? (
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <EpisodePlayer episodeDetail={episodeDetail} />
          <EpisodeInformation
            animeDetail={animeDetail}
            episodeDetail={episodeDetail}
          />
          {/* <EpisodeOwnerList listEpisodes={animeDetail?.listEpisodes} />
          <SuggestionByView /> */}
        </>
      )}
    </div>
  );
};

export default page;
