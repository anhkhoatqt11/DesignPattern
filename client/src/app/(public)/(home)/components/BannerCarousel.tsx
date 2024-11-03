"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useAnime } from "@/hooks/useAnime";

function BannerCarousel() {
  const { fetchAnimeBanner } = useAnime();
  const [isLoaded, setIsLoaded] = React.useState(false);

  const { data, isLoading } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await fetchAnimeBanner();
      setIsLoaded(true);
      return res;
    },
  });

  //Ensure data is available before rendering
  if (isLoading || !data) {
    return null;
  }

  return (
    <div className="w-full flex-col bg-white text-white dark:border-r lg:flex -mt-[50px] md:-mt-[76px]">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={true}
        showThumbs={false}
        showStatus={false}
        showArrows={true}
      >
        {data?.animeList?.map((item) => (
          <Link href={`event/${item?.SuKienId}`}>
            <div key={item?._id} className="w-full aspect-[16/8] relative">
              <img
                className="rounded-lg w-full aspect-[16/8]"
                src={item?.landspaceImage}
                alt="Anime background"
                style={{ objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-black opacity-60" />
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
}

export default BannerCarousel;
