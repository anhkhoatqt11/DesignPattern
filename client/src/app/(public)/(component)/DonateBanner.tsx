import { AspectRatio } from "@/components/ui/aspect-ratio";
export const DonateBanner = ({ url }) => {
  return (
    <div className="my-3 mx-20 overflow-hidden rounded-md hover:shadow-lg hover:shadow-fuchsia-500 transition-transform group-hover:scale-110 transition ease-in-out duration-300 hover:scale-105">
      <AspectRatio ratio={16 / 2}>
        <img src={url} alt={"img"} className="object-cover h-full w-full" />
      </AspectRatio>
    </div>
  );
};
