import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
export const RankingComicItem = ({ item, rank }) => {
  return (
    <div className="bg-[#313131] rounded-md flex flex-col w-full">
      {item?.map((comic, index) => (
        <div>
          <div className="bg-transparent flex flex-row p-4 gap-4 items-center transition ease-in-out duration-300 hover:scale-105 hover:-rotate-1">
            {rank === 0 && index === 0 ? (
              <p className="bg-gradient-to-t from-[#da5ef0] to-[#da5ef0]/80 text-transparent text-xl font-bold bg-clip-text drop-shadow-md">
                #1
              </p>
            ) : rank === 0 && index === 1 ? (
              <p className="bg-gradient-to-t from-[#2eb95f] to-[#2eb95f]/30 text-transparent text-xl font-bold bg-clip-text drop-shadow-md">
                #2
              </p>
            ) : rank === 0 && index === 2 ? (
              <p className="bg-gradient-to-t from-[#3facff] to-[#3facff]/30 text-transparent text-xl font-bold bg-clip-text drop-shadow-md">
                #3
              </p>
            ) : (
              <p className="w-[26px] text-center bg-gradient-to-t from-[#a3a3a3] to-[#a3a3a3]/80 text-transparent text-xl font-bold bg-clip-text drop-shadow-md">
                {5 * rank + index + 1}
              </p>
            )}
            <div className="overflow-hidden rounded-md w-[50px]">
              <AspectRatio ratio={1 / 1}>
                <img
                  src={comic?._id?.coverImage[0]}
                  alt={"img"}
                  className="object-cover h-full w-full transition-transform group-hover:scale-110 transition ease-in-out duration-300 hover:scale-105"
                />
              </AspectRatio>
            </div>
            <div className="flex flex-col gap-3 w-[180px]">
              <p className="truncate text-white text-[15px] font-semibold">
                {comic?._id?.comicName[0]}
              </p>
              <div className="text-gray-500 text-[13px] font-medium -mt-3">
                {convertGenreArrToString(comic?._id?.genres)}
              </div>
            </div>
          </div>
          {index !== 4 ? <Separator className="bg-[#7C7C7E]" /> : null}
        </div>
      ))}
    </div>
  );
};

function convertGenreArrToString(genres) {
  return genres.map((item) => item.genreName).join("/ ");
}
