"use client";

import { useEffect, useState } from "react";
import { useComic } from "@/hooks/useComic";
import Loader from "@/components/Loader";
import ComicAlbumList from "../../(component)/ComicAlbumList";
import { DonateBanner } from "../../(component)/DonateBanner";
import DonateList from "../../(component)/DonateList";
import RankingComic from "../../(component)/RankingComic";

function ComicAlbum() {
  const { getComicAlbum } = useComic();
  const [listComicAlbum, setListComicAlbum] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const fetchComicAlbum = async () => {
      const resComic = await getComicAlbum();
      setListComicAlbum(resComic);
      setIsLoaded(true);
    };
    fetchComicAlbum();
  }, []);

  return (
    <>
      {!isLoaded ? (
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {listComicAlbum?.map((item, index) => (
            <div key={index} className="flex flex-col gap-3">
              <ComicAlbumList
                comicAlbumName={item?.albumName}
                idList={item?.comicList}
              />
              {index === 1 ? <DonateBanner url={"/donateweb1.png"} /> : ""}

              {index === 2 || index === 3 ? <DonateList /> : ""}

              {index === 3 ? <DonateBanner url={"/donateweb2.png"} /> : ""}

              {index == 4 ? <RankingComic /> : ""}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ComicAlbum;
