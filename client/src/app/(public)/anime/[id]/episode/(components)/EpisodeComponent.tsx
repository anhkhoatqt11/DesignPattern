"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import EpisodePlayer from "./EpisodePlayer";
import { EpisodeInformation } from "./EpisodeInformation";
import { useAnime } from "@/hooks/useAnime";
import { EpisodeOwnerList } from "./EpisodeOwnerList";
import { SuggestionByView } from "./SuggestionByView";
import Loader from "@/components/Loader";

const EpisodeComponent = ({ params, session }) => {
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
      setIsLoadingAnimeDetail(false);
      setAnimeDetail(result[0]);
    };
    const fetchEpisodeDetail = async () => {
      const result = await getAnimeEpisodeDetailById(episodeId);
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
          <EpisodePlayer episodeDetail={episodeDetail} session={session} />
          <EpisodeInformation
            animeDetail={animeDetail}
            episodeDetail={episodeDetail}
            session={session}
          />
          <EpisodeOwnerList
            listEpisodes={animeDetail?.listEpisodes}
            animeId={animeId}
          />
          <SuggestionByView />
        </>
      )}
    </div>
  );
};

export default EpisodeComponent;
