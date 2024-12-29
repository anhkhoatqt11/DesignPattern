import React from "react";
import { Badge } from "@/components/ui/badge";
import { Image } from "@nextui-org/react";
import GenresBadageList from "@/app/(public)/search/(components)/GenresBadageList";

const BookmarkItem = ({ image, name, ownerName, genere }) => {
  return (
    <div className="p-4">
      <div className="flex items-start gap-4">
        <div className="w-36 h-36 flex-shrink-0">
          <img
            src={image}
            alt={name}
            className="object-cover rounded-md w-full h-full"
            style={{ height: "100%" }}
          />
        </div>
        <div className="space-y-2">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">{ownerName}</h2>
            <h2 className="text-base font-medium text-gray-400">{name}</h2>
            <div className="flex flex-wrap gap-2">
              <GenresBadageList genresItem={genere} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkItem;
