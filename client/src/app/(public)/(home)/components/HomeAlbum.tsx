"use client";

import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { useAnime } from "@/hooks/useAnime";
import { useComic } from "@/hooks/useComic";
import Loader from "@/components/Loader";
import ComicAlbumList from "../../(component)/ComicAlbumList";
import AnimeAlbumList from "../../(component)/AnimeAlbumList";
import TopViewList from "../../(component)/TopViewList";
import { DonateBanner } from "../../(component)/DonateBanner";
import DonateList from "../../(component)/DonateList";
import RankingAnime from "../../(component)/RankingAnime";
import RankingComic from "../../(component)/RankingComic";
import WatchingHistory from "../../(component)/WatchingHistory";
import ReadingHistory from "../../(component)/ReadingHistory";
import NewEpisodeList from "../../(component)/NewEpisodeList";
import NewChapterList from "../../(component)/NewChapterList";

function HomeAlbum() {
  const { getAnimeAlbum, getTopViewAnime } = useAnime();
  const { getComicAlbum } = useComic();
  const [listComicAlbum, setListComicAlbum] = useState();
  const [listAnimeAlbum, setListAnimeAlbum] = useState();
  const [listTopView, setListTopView] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [listGenerate, setListGenerate] = useState<number[]>([]);
  useEffect(() => {
    const fetchHomeAlbum = async () => {
      const resComic = await getComicAlbum();
      setListComicAlbum(resComic);
      const resAnime = await getAnimeAlbum();
      setListAnimeAlbum(resAnime);
      const resTopView = await getTopViewAnime();
      setListTopView(resTopView);
      setListGenerate(
        Array.from(
          {
            length:
              Math.round(resAnime?.length / 2) >
              Math.round(resTopView?.length / 2)
                ? Math.round(resAnime?.length / 2) > resComic?.length
                  ? Math.round(resAnime?.length / 2)
                  : resComic?.length
                : Math.round(resTopView?.length / 2) > resComic?.length
                ? Math.round(resTopView?.length / 2)
                : resComic?.length,
          },
          (_, index) => index + 1
        )
      );
      setIsLoaded(true);
    };
    fetchHomeAlbum();
  }, []);

  return (
    <>
      {!isLoaded ? (
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {listGenerate.map((_, index) => (
            <div key={index} className="flex flex-col gap-3">
              {index < listComicAlbum.length ? (
                <ComicAlbumList
                  comicAlbumName={listComicAlbum[index]?.albumName}
                  idList={listComicAlbum[index]?.comicList}
                />
              ) : (
                ""
              )}

              {index === 1 ? <ReadingHistory /> : ""}
              {index === 1 ? <NewChapterList /> : ""}
              {2 * index < listAnimeAlbum.length ? (
                <AnimeAlbumList
                  animeAlbumName={listAnimeAlbum[2 * index].albumName}
                  idList={listAnimeAlbum[2 * index]._id}
                />
              ) : (
                ""
              )}

              {index === 1 ? <WatchingHistory /> : ""}
              {index === 1 ? <NewEpisodeList /> : ""}

              {2 * index + 1 < listAnimeAlbum.length ? (
                <AnimeAlbumList
                  animeAlbumName={listAnimeAlbum[2 * index + 1].albumName}
                  idList={listAnimeAlbum[2 * index + 1]._id}
                />
              ) : (
                ""
              )}

              {index * 2 + 1 < listTopView.length ? (
                <TopViewList
                  animeName={listTopView[index * 2 + 1]._id?.movieName[0]}
                  animeId={listTopView[index * 2 + 1]._id?.movieOwnerId[0]}
                />
              ) : (
                ""
              )}

              {index === 1 ? <DonateBanner url={"/donateweb1.png"} /> : ""}

              {index === 3 ? <DonateBanner url={"/donateweb2.png"} /> : ""}

              {index === 2 || index === 3 ? <DonateList /> : ""}

              {index == 4 ? <RankingAnime /> : ""}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default HomeAlbum;
