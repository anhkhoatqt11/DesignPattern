import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
export const DonateBanner = ({ url }) => {
  return (
    <Link href="/donate">
      <div className="my-3 mx-8 sm:mx-20 overflow-hidden rounded-md hover:shadow-lg hover:shadow-fuchsia-500 transition-transform group-hover:scale-110 transition ease-in-out duration-300 hover:scale-105">
        <AspectRatio ratio={16 / 2}>
          <img src={url} alt={"img"} className="object-cover h-full w-full" />
        </AspectRatio>
      </div>
    </Link>
  );
};
