import React from 'react';
import { Button } from "@/components/ui/button"
import { ImageIcon } from 'lucide-react'
import { Image } from '@nextui-org/react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import toast from 'react-hot-toast';

const AvatarDialog = ({ avatarList, currentAvatar, onUpdateAvatar, userId, refetchUserInfo }) => {
    const handleAvatarSelect = async (avatarUrl) => {
        try {
            const data = {
                userId: userId,
                avatarUrl: avatarUrl
            };
            await onUpdateAvatar(data);
            refetchUserInfo();
            toast.success('Đã cập nhật hình đại diện');
        } catch (error) {
            console.error('Error updating avatar:', error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="secondary"
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-500 text-white"
                >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Thay đổi hình đại diện
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-xl mb-4">Chọn hình đại diện</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto p-4">
                    {avatarList.map((collection) => (
                        <div key={collection._id} className="space-y-2">
                            <h3 className="text-sm font-medium text-zinc-400">{collection.collectionName}</h3>
                            <div className="grid gap-4">
                                {collection.avatarList.map((avatarUrl, index) => (
                                    <div 
                                        key={`${collection._id}-${index}`}
                                        className={`relative cursor-pointer rounded-lg overflow-hidden transition-all
                                            ${currentAvatar === avatarUrl ? 'ring-4 ring-purple-500' : 'hover:ring-2 hover:ring-purple-400'}
                                        `}
                                        onClick={() => handleAvatarSelect(avatarUrl)}
                                    >
                                        <Image
                                            src={avatarUrl}
                                            alt={`Avatar from ${collection.collectionName}`}
                                            width={300}
                                            className="w-full h-32 object-cover"
                                        />
                                        {currentAvatar === avatarUrl && (
                                            <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                                                <div className="bg-purple-500 text-white text-xs px-2 py-1 rounded">
                                                    Current
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AvatarDialog;