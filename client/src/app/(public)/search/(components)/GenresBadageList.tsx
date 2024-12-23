import React from "react";
import { Badge } from "@/components/ui/badge";

const GenresBadageList = ({ genresItem }) => {
  return (
    <>
      {genresItem?.map((tag) => (
        <Badge
          key={tag.genreName}
          variant="secondary"
          className="bg-[#282727] hover:bg-gradient-to-r from-[#A958FE] to-[#DA5EF0] transition ease-in-out duration-300 cursor-pointer px-3 py-2 rounded-full border-zinc-500"
        >
          {tag.genreName}
        </Badge>
      ))}
    </>
  );
};

export default GenresBadageList;
