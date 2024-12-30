import React from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const GenresBadageList = ({ genresItem }) => {
  return (
    <>
      {genresItem?.map((tag) => (
        <Link
          key={tag.genreName}
          href={`/search?searchWord=${tag.genreName}`}
          className="no-underline"
        >
          <Badge
            variant="secondary"
            className="bg-[#282727] hover:bg-gradient-to-r from-[#A958FE] to-[#DA5EF0] transition ease-in-out duration-300 cursor-pointer px-3 py-2 rounded-full border-zinc-500"
          >
            {tag.genreName}
          </Badge>
        </Link>
      ))}
    </>
  );
};

export default GenresBadageList;
