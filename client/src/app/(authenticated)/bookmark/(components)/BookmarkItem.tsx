import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Image } from '@nextui-org/react';

const BookmarkItem = ({ image, name, genere, description }) => {
    return (
        <div className="p-4">
            <div className="flex items-start gap-4">
                <div className="w-36 h-36 flex-shrink-0">
                    <Image
                        src={image}
                        alt={name}
                        className="object-cover rounded-md"
                        width="100%"
                        height="100%"
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-medium">{name}</h2>
                        <Badge variant="secondary" className="bg-purple-900/50 text-purple-400">
                            {genere}
                        </Badge>
                    </div>
                    <p className="text-sm text-gray-400">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default BookmarkItem;