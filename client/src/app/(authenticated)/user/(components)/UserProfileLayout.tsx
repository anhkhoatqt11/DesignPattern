"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Image } from "@nextui-org/react";
import { useUser } from "@/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import AvatarDialog from "./AvatarDialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import Link from "next/link";
import { signOut } from "next-auth/react";
import LogoutIcon from "@/components/logouticon";
const UserProfileLayout = ({ session }) => {
  const { fetchUserInfoById, getAvatarList, updateAvatar, updateUsername } =
    useUser();
  const [username, setUsername] = useState("");

  const {
    data: userInfo,
    isLoading: isUserInfoLoading,
    refetch: refetchUserInfo,
  } = useQuery({
    queryKey: ["user", "info", session?.user?.id],
    queryFn: async () => {
      const res = await fetchUserInfoById(session?.user?.id);
      console.log(res);
      setUsername(res.username);
      return res;
    },
  });

  const { data: avatarList, isLoading: isAvatarListLoading } = useQuery({
    queryKey: ["avatar", "list"],
    queryFn: async () => {
      const res = await getAvatarList();
      return res;
    },
  });

  const handleUpdateUsername = async () => {
    try {
      const data = {
        userId: session?.user?.id,
        username: username,
      };
      await updateUsername(data);
      await refetchUserInfo();
      toast.success("Cập nhật tên thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật tên");
      console.error(error);
    }
  };

  if (isUserInfoLoading || isAvatarListLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black p-4 md:p-8">
        <Card className="mx-auto max-w-7xl bg-zinc-900/50 border-zinc-800">
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-white mb-8">
              Thông tin cá nhân
            </h1>

            <div className="flex gap-8">
              {/* Left side - Avatar section */}
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-700">
                    <Image
                      src={userInfo?.avatar || "/placeholder.svg"}
                      alt="Profile picture"
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                </div>

                <AvatarDialog
                  avatarList={avatarList}
                  currentAvatar={userInfo?.avatar}
                  onUpdateAvatar={updateAvatar}
                  userId={session?.user?.id}
                  refetchUserInfo={refetchUserInfo}
                />
              </div>

              {/* Right side - Information section */}
              <div className="flex-1 text-white">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      disabled
                      id="phone"
                      value={userInfo?.phone || "Không có dữ liệu"}
                    ></Input>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coin">Skycoin</Label>
                    <Input
                      disabled
                      id="coin"
                      value={userInfo?.coinPoint || "Không có dữ liệu"}
                    ></Input>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Họ và tên</Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={userInfo?.username || "Không có dữ liệu"}
                    />
                    <Button
                      onClick={handleUpdateUsername}
                      disabled={!username}
                      size="lg"
                      className="mt-8 bg-purple-600 hover:bg-purple-500 text-white"
                    >
                      Cập nhật
                    </Button>
                    <Link
                      key="logout"
                      onClick={() => signOut()}
                      href={"/auth/login"}
                    >
                      <div className="flex flex-row items-center py-3">
                        <LogoutIcon className="mr-2 ms-3 w-6 h-6" />
                        <div>Đăng xuất</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default UserProfileLayout;
