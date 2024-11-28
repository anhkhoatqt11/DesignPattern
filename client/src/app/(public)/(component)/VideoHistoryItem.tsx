import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Progress } from "@nextui-org/react";
import { FaPlay } from "react-icons/fa6";
export const VideoHistoryItem = ({ img, name, progress }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-md hover:shadow-lg hover:shadow-fuchsia-500 relative">
        <AspectRatio ratio={16 / 9} className="absolute">
          <img
            src={img}
            alt={"img"}
            className="object-cover h-full w-full transition-transform group-hover:scale-110 transition ease-in-out duration-300 hover:scale-105"
          />
        </AspectRatio>
        <Progress
          size="sm"
          color="danger"
          value={progress}
          className="absolute bottom-0 left-0"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className=" transition ease-in-out duration-300 hover:scale-105 bg-white/70 w-[50px] h-[50px] rounded-full flex items-center justify-center">
            <FaPlay className="w-6 h-6 text-[#da5ef0] ml-1 mt-[2px]" />
          </div>
        </div>
      </div>
      <p className="truncate text-white text-lg font-semibold">{name}</p>
    </div>
  );
};
