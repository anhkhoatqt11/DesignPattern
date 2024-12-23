import React from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import { Image } from "@nextui-org/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";

const AvatarDialog = ({
  avatarList,
  currentAvatar,
  onUpdateAvatar,
  userId,
  refetchUserInfo,
}) => {
  const handleAvatarSelect = async (avatarUrl) => {
    try {
      const data = {
        userId: userId,
        avatarUrl: avatarUrl,
      };
      await onUpdateAvatar(data);
      refetchUserInfo();
      toast.success("Đã cập nhật hình đại diện");
    } catch (error) {
      console.error("Error updating avatar:", error);
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
      <DialogContent className="max-w-3xl bg-[#141414]">
        <DialogHeader>
          <DialogTitle className="text-xl ml-3.5 text-[#DA5EF0]">
            Chọn hình đại diện
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto p-4">
          {avatarList.map((collection) => (
            <div key={collection._id} className="space-y-2">
              <h3 className="text-base font-medium text-zinc-400">
                {collection.collectionName}
              </h3>
              <div className="flex flex-row flex-wrap gap-4">
                {collection.avatarList.map((avatarUrl, index) => (
                  <div
                    key={`${collection._id}-${index}`}
                    className={`w relative cursor-pointer rounded overflow-hidden transition-all
                                            ${
                                              currentAvatar === avatarUrl
                                                ? "ring-2 ring-purple-500"
                                                : "hover:shadow-md hover:shadow-emerald-500"
                                            }
                                        `}
                    onClick={() => handleAvatarSelect(avatarUrl)}
                  >
                    <Image
                      src={avatarUrl}
                      alt={`Avatar from ${collection.collectionName}`}
                      width={300}
                      className="w-32 h-32 object-cover rounded hover:scale-105"
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
