import { AspectRatio } from "@/components/ui/aspect-ratio";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaBookOpen } from "react-icons/fa6";
import Link from "next/link";
export const ComicHistoryItem = ({ id, img, name, ownerId }) => {
  return (
    <div className="flex flex-col gap-3">
      <Link href={`/comic/${ownerId}/chapter?chapterId=${id}`}>
        <div className="group overflow-hidden rounded-md hover:shadow-lg hover:shadow-fuchsia-500 relative">
          <AspectRatio ratio={1 / 1} className="absolute">
            <img
              src={img}
              alt={"img"}
              className="object-cover h-full w-full brightness-50 transition-transform group-hover:scale-110 transition ease-in-out duration-300 hover:scale-105"
            />
          </AspectRatio>
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-20">
            <FaBookOpen className="text-white text-lg w-10 h-10" />
          </div>
        </div>
      </Link>
      <div className="flex flex-row gap-1 justify-between items-center">
        <p className="truncate text-white text-lg font-semibold">{name}</p>
        <Link href={`/comic/${ownerId}`}>
          <IoIosInformationCircleOutline className="text-white text-lg w-6 h-6" />
        </Link>
      </div>
    </div>
  );
};
