import React from 'react'
import { Badge } from "@/components/ui/badge"

const GenresBadageList = ({ genresItem }) => {
    return (
        <>
            {genresItem?.map((tag) => (
                <Badge
                    key={tag.genreName}
                    variant="secondary"
                    className="bg-gray-800 hover:bg-gray-700 cursor-pointer"
                >
                    {tag.genreName}
                </Badge>
            ))}
        </>
    )
}

export default GenresBadageList