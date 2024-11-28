import { AspectRatio } from "@/components/ui/aspect-ratio";
export const NewEpisodeItem = ({ img, name, movieOwner }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-md hover:shadow-lg hover:shadow-fuchsia-500">
        <AspectRatio ratio={16 / 9}>
          <img
            src={img}
            alt={"img"}
            className="object-cover h-full w-full transition-transform group-hover:scale-110 transition ease-in-out duration-300 hover:scale-105"
          />
        </AspectRatio>
      </div>
      <div className="flex flex-col">
        <p className="truncate text-white text-lg font-semibold">{name}</p>
        <p className="truncate text-gray-500 text-base font-medium">
          {movieOwner}
        </p>
      </div>
    </div>
  );
};
