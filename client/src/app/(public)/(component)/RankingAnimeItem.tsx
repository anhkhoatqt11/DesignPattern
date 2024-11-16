import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
export const RankingAnimeItem = ({ item, rank }) => {
  return rank === 0 ? (
    <Link href={`/anime/${item?._id?.movieOwnerId}`}>
      <div className="relative hover:shadow-lg hover:shadow-fuchsia-500 hover:scale-[1.01] transition ease-in-out duration-300">
        <div className="overflow-hidden rounded-md relative">
          <AspectRatio ratio={9 / 11}>
            <img
              src={item?._id?.coverImage}
              alt={"img"}
              className="object-cover h-full w-full transition-transform group-hover:scale-110 transition ease-in-out duration-300 hover:scale-105"
            />
          </AspectRatio>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-60" />
        </div>
        <div className="flex flex-row items-end gap-3 absolute bottom-2 left-2 w-full">
          <p className="bg-gradient-to-t from-[#da5ef0] to-[#da5ef0]/30 text-transparent text-[80px] font-bold bg-clip-text leading-[70px] drop-shadow-md shadow-red-500">
            {rank + 1}
          </p>
          <p className="truncate text-white text-xl font-semibold w-full overflow-clip pr-4">
            {item?._id?.movieName}
          </p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="flex flex-col gap-5">
      <Link href={`/anime/${item[0]._id?.movieOwnerId}`}>
        <div className="relative hover:shadow-lg hover:shadow-fuchsia-500 hover:scale-[1.01] transition ease-in-out duration-300">
          <div className="overflow-hidden rounded-md relative">
            <AspectRatio ratio={16 / 9}>
              <img
                src={item[0]?._id?.landspaceImage}
                alt={"img"}
                className="object-cover h-full w-full transition-transform group-hover:scale-110 transition ease-in-out duration-300 hover:scale-105"
              />
            </AspectRatio>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-60" />
          </div>
          <div className="flex flex-row items-end gap-3 absolute bottom-2 left-2 w-full">
            <p
              className={`bg-gradient-to-t ${
                2 * rank === 2 ? `from-[#2eb95f]` : `from-[#a3a3a3]`
              } ${
                2 * rank === 2 ? `to-[#2eb95f]/30` : `to-[#a3a3a3]/80`
              } text-transparent text-[80px] font-bold bg-clip-text leading-[70px]`}
            >
              {2 * rank}
            </p>
            <p className="truncate text-white text-xl font-semibold w-full overflow-clip pr-4">
              {item[0]?._id?.movieName}
            </p>
          </div>
        </div>
      </Link>
      <Link href={`/anime/${item[1]?._id?.movieOwnerId}`}>
        <div className="relative hover:shadow-lg hover:shadow-fuchsia-500 hover:scale-[1.01] transition ease-in-out duration-300">
          <div className="overflow-hidden rounded-md relative">
            <AspectRatio ratio={16 / 9}>
              <img
                src={item[1]?._id?.landspaceImage}
                alt={"img"}
                className="object-cover h-full w-full transition-transform group-hover:scale-110 transition ease-in-out duration-300 hover:scale-105"
              />
            </AspectRatio>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-60" />
          </div>
          <div className="flex flex-row items-end gap-3 absolute bottom-2 left-2 w-full">
            <p
              className={`bg-gradient-to-t ${
                2 * rank + 1 === 3 ? "from-[#3facff]" : "from-[#a3a3a3]"
              } ${
                2 * rank + 1 === 3 ? "to-[#3facff]/30" : "to-[#a3a3a3]/80"
              } text-transparent text-[80px] font-bold bg-clip-text leading-[70px]`}
            >
              {2 * rank + 1}
            </p>
            <p className="truncate text-white text-xl font-semibold w-full overflow-clip pr-4">
              {item[1]?._id?.movieName}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
