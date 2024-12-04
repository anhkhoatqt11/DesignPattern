"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";
import { useComic } from "@/hooks/useComic";
import { FaCommentAlt, FaThumbsUp } from "react-icons/fa";
import { LuPlusSquare } from "react-icons/lu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaClipboardList } from "react-icons/fa6";
import { Divider, Image, Progress } from "@nextui-org/react";
import { convertUtcToGmtPlus7 } from "../(components)/ComicInfo";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { ChapterComment } from "./(components)/ChapterComment";
import { BiSolidCommentDetail } from "react-icons/bi";
import toast from "react-hot-toast";
import { useQuest } from "@/hooks/useQuest";

const page = ({ params }) => {
  const searchParams = useSearchParams();

  const userId = "65ec67ad05c5cb2ad67cfb3f";
  const comicId = params.id;
  const chapterId = searchParams.get("chapterId");
  const userInfo = {
    id: "65ec67ad05c5cb2ad67cfb3f",
    questLog: {
      readingTime: 3,
      watchingTime: 2,
    },
  };
  const {
    getChapter,
    checkUserHasLikeOrSaveChapter,
    updateUserLikeChapter,
    updateUserSaveChapter,
    updateChapterView,
    updateUserHistoryHadSeenChapter,
  } = useComic();
  const { updateQuestLog } = useQuest();
  let completedView = false;
  const [isLoading, setIsLoading] = useState(true);
  const [chapterList, setChapterList] = useState([]);
  const [chapterName, setChapterName] = useState();
  const [currentChapterDetail, setCurrentChapterDetail] = useState();
  const [hasLiked, setHasLiked] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const [readingPercentage, setReadingPercentage] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const onScroll = useCallback(async (event) => {
    const { scrollY, innerHeight } = window;
    const scrollTop = scrollY;
    const docHeight = document.body.offsetHeight;
    const winHeight = innerHeight;
    const scrollPercent = scrollTop / (docHeight - winHeight);
    const percentScroll = Math.round(scrollPercent * 100);
    if (percentScroll >= 50 && !completedView) {
      completedView = true;
      await updateChapterView(chapterId);
      if (userId) {
        await updateQuestLog("", userInfo);
      }
    }
    setReadingPercentage(percentScroll);
  }, []);

  const fetchChapterList = async () => {
    const result = await getChapter(comicId);
    setChapterList(result[0]?.detailChapterList);
    setCurrentChapterDetail(
      result[0]?.detailChapterList?.find((i) => i?._id === chapterId)?.content
    );
    setChapterName(
      result[0]?.detailChapterList?.find((i) => i?._id === chapterId)
        ?.chapterName
    );
    if (userId) await updateUserHistoryHadSeenChapter(chapterId, userId);
    setIsLoading(false);
  };
  const checkLikeSaveChapter = async () => {
    const result = await checkUserHasLikeOrSaveChapter(chapterId, userId);
    setHasLiked(result?.like);
    setHasSaved(result?.bookmark);
  };
  useEffect(() => {
    fetchChapterList();
    checkLikeSaveChapter();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleChangeLike = async () => {
    if (!userId) {
      router.push("/auth/login");
      return;
    }
    setHasLiked((prev) => !prev);
    await updateUserLikeChapter(chapterId, userId);
  };

  const handleChangeSave = async () => {
    if (!userId) {
      router.push("/auth/login");
      return;
    }
    setHasSaved((prev) => !prev);
    await updateUserSaveChapter(chapterId, userId);
  };
  return (
    <>
      <div className="bg-black -mt-[50px] md:-mt-[76px] flex justify-center relative">
        {isLoading ? (
          <div className="flex h-screen items-center justify-center">
            <Loader />
          </div>
        ) : (
          <>
            <div className="flex flex-col w-2/3">
              {currentChapterDetail?.map((item) => (
                <img key={item} src={item} />
              ))}
            </div>
            <div className="fixed bottom-0 left-0 right-0 flex flex-col gap-0">
              <Progress
                aria-label="Reading percentage"
                value={readingPercentage}
                className="w-full"
                color="danger"
                size={"sm"}
              />
              <div className="bg-[#141414] p-6 px-12 flex flex-row justify-between">
                <span className="text-white font-medium text-lg">
                  {chapterName}
                </span>
                <div className="flex flex-row gap-6">
                  <div
                    className="flex flex-col gap-2 justify-center items-center"
                    onClick={onOpen}
                  >
                    <BiSolidCommentDetail className={`w-6 h-6 text-white`} />
                  </div>
                  <Sheet key={"right"}>
                    <SheetTrigger asChild>
                      <div className="flex flex-col gap-2 justify-center items-center">
                        <FaClipboardList className={`w-5 h-5 text-white`} />
                      </div>
                    </SheetTrigger>
                    <SheetContent side={"right"} className="bg-[#2b2b2b]">
                      <SheetHeader>
                        <SheetTitle className="text-[#DA5EF0] px-8">
                          Danh sách chương
                        </SheetTitle>
                      </SheetHeader>
                      <div className="flex flex-col gap-2 mt-4 h-full overflow-y-scroll pb-10">
                        {chapterList?.map((chap, index) => (
                          <div key={chap?._id}>
                            {index !== 0 && (
                              <Divider className="h-[0.8px] bg-[#353434] rounded-full mb-2" />
                            )}
                            <SheetClose asChild>
                              <a
                                href={`/comic/${comicId}/chapter?chapterId=${chap?._id}`}
                                className="flex flex-row gap-3 hover:bg-[#141414] px-8 py-4 cursor-default"
                              >
                                <Image
                                  src={chap?.coverImage}
                                  alt={`Chapter Cover`}
                                  width={50}
                                  height={50}
                                  className="rounded-lg"
                                />
                                <div className="flex flex-col gap-1">
                                  <span className="block text-white font-semibold">
                                    {chap?.chapterName}
                                  </span>
                                  <span className="block text-xs text-[#8E8E8E]">
                                    {convertUtcToGmtPlus7(chap?.publicTime)}
                                  </span>
                                </div>
                              </a>
                            </SheetClose>
                          </div>
                        ))}
                      </div>
                      <SheetFooter>
                        <SheetClose asChild></SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </div>
                <div className="flex flex-row gap-5">
                  <div
                    className="flex flex-col gap-2 justify-center items-center"
                    onClick={handleChangeLike}
                  >
                    <FaThumbsUp
                      className={`w-5 h-5 ${
                        !hasLiked ? "text-white" : "text-[#DA5EF0]"
                      }`}
                    />
                  </div>
                  <div
                    className="flex flex-col gap-2 justify-center items-center"
                    onClick={handleChangeSave}
                  >
                    <LuPlusSquare
                      className={`w-5 h-5 ${
                        !hasSaved ? "text-white" : "text-[#DA5EF0]"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Modal
        size={"lg"}
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        className="bg-black"
      >
        <ModalContent>
          {
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <ChapterComment chapterId={chapterId} />
              </ModalBody>
            </>
          }
        </ModalContent>
      </Modal>
    </>
  );
};

export default page;
