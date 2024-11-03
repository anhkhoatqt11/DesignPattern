import { AspectRatio } from "@/components/ui/aspect-ratio";
export const ComicItem = ({ img, name, genres }) => {
  const genreTag = genres.map((item) => item.genreName).join("/ ");
  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-md hover:shadow-lg hover:shadow-fuchsia-500">
        <AspectRatio ratio={3 / 4}>
          <img
            src={img}
            alt={"img"}
            className="object-cover h-full w-full transition-transform group-hover:scale-110 transition ease-in-out duration-300 hover:scale-105"
          />
        </AspectRatio>
      </div>
      <p className="truncate text-white text-lg font-semibold">{name}</p>
      <div className="text-gray-500 text-sm font-medium -mt-3">{genreTag}</div>
    </div>
  );
};
