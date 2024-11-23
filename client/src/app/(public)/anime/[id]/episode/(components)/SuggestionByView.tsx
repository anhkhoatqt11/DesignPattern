import { TopViewItem } from "@/app/(public)/(component)/TopViewItem";
import { useAnime } from "@/hooks/useAnime";
import Link from "next/link";
import { useEffect, useState } from "react";

export const SuggestionByView = () => {
  const { getSomeTopViewEpisodes } = useAnime();
  const [suggestList, setSuggestList] = useState();
  useEffect(() => {
    const fetchSuggestion = async () => {
      const result = await getSomeTopViewEpisodes();
      console.log("🚀 ~ fetchSuggestion ~ result:", result);
      setSuggestList(result);
    };
    fetchSuggestion();
  }, []);
  return (
    <div className="w-full">
      <section
        id="categories"
        aria-labelledby="categories-heading"
        className="space-y-6 py-6 px-4"
      >
        <div className="flex flex-row gap-3">
          <div className="w-[6px] h-[24px] sm:w-[8px] sm:h-[40px] bg-gradient-to-b from-[#A958FE] to-[#DA5EF0] rounded-full z-10">
            {" "}
          </div>
          <h2 className="text-white text-xl font-bold leading-[1.1] sm:text-3xl z-10">
            Tập phim nổi bật
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {suggestList?.map((item) => (
            <Link href={``}>
              <TopViewItem
                img={item?.coverImage}
                name={item?.episodeName}
                view={item?.views}
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
