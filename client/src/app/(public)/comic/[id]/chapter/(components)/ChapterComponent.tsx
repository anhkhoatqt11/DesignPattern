"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";
import { useComic } from "@/hooks/useComic";
import { FaCommentAlt, FaThumbsUp } from "react-icons/fa";
import { LuPlusSquare } from "react-icons/lu";
import { FaClipboardList } from "react-icons/fa6";
import { Divider, Image, Progress, Spinner } from "@nextui-org/react";
import { convertUtcToGmtPlus7 } from "../../(components)/ComicInfo";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { ChapterComment } from "../(components)/ChapterComment";
import { BiSolidCommentDetail } from "react-icons/bi";
import toast from "react-hot-toast";
import { useQuest } from "@/hooks/useQuest";
import { useUser } from "@/hooks/useUser";
import { MdErrorOutline, MdLock } from "react-icons/md";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoWalletOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";

const page = async ({ comicId, session }) => {
  const searchParams = useSearchParams();

  const userId = session?.user?.id;
  const chapterId = searchParams.get("chapterId");

  const userCoins = 1000;
  const {
    getChapter,
    checkUserHasLikeOrSaveChapter,
    updateUserLikeChapter,
    updateUserSaveChapter,
    updateChapterView,
    updateUserHistoryHadSeenChapter,
  } = useComic();
  const { updateQuestLog } = useQuest();
  const {
    getPaymentHistories,
    paySkycoin,
    getUserCoinAndChallenge,
    fetchUserInfoById,
  } = useUser();
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
  const [boughtChapterList, setBoughtChapterList] = useState([]);
  const [processPayment, setProcessPayment] = useState(false);
  let boughtInfo = {
    chapterId: "",
    unlockPrice: 0,
    chapterName: "",
    coverImage: "",
  };
  const [modalMode, setModalMode] = useState("comment");
  const [errorMessage, setErrorMessage] = useState("");

  const { data: userCoinAndQCData, refetch: refetchUserCoinAndQCData } =
    useQuery({
      queryKey: ["user", "coinAndQCData", session?.user?.id],
      queryFn: async () => {
        const res = await getUserCoinAndChallenge(session?.user?.id);
        return res;
      },
    });

  const { data: userInfo } = useQuery({
    queryKey: ["user", "info", session?.user?.id],
    queryFn: async () => {
      const res = await fetchUserInfoById(session?.user?.id);
      return res;
    },
  });
  console.log("🚀 ~ page ~ userInfo:", userInfo);

  const onScroll = useCallback(async (event) => {
    const { scrollY, innerHeight } = window;
    const scrollTop = scrollY;
    const docHeight = document.body.offsetHeight;
    const winHeight = innerHeight;
    const scrollPercent = scrollTop / (docHeight - winHeight);
    const percentScroll = Math.round(scrollPercent * 100);
    if (percentScroll >= 50 && !completedView) {
      completedView = true;
      refetchUserCoinAndQCData();
      await updateChapterView(chapterId);
      if (userId) {
        await updateQuestLog("", {
          id: userId,
          questLog: userCoinAndQCData?.questLog,
        });
      }
    }
    setReadingPercentage(percentScroll);
  }, []);

  const processBuyChapter = async () => {
    setProcessPayment(true);
    try {
      await paySkycoin(userId, boughtInfo?.unlockPrice, boughtInfo?.chapterId);
      setBoughtChapterList([...boughtChapterList, boughtInfo.chapterId]);
    } catch (error) {
      setErrorMessage(
        "Giao dịch thất bại, vui lòng kiểm tra lại số dư và thử lại"
      );
    }
    setProcessPayment(false);
  };

  const fetchChapterList = async () => {
    const result = await getChapter(comicId);
    const boughtList = await getPaymentHistories(userId);
    setChapterList(result[0]?.detailChapterList);
    setBoughtChapterList(boughtList);
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
                    onClick={() => {
                      setModalMode("comment");
                      onOpen();
                    }}
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
                              {boughtChapterList.includes(chap?._id) ||
                              chap?.unlockPrice === 0 ? (
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
                              ) : (
                                <Sheet key={"bottom"}>
                                  <SheetTrigger asChild>
                                    <div className="flex flex-row gap-3 hover:bg-[#141414] px-8 py-4 cursor-default">
                                      <Image
                                        src={chap?.coverImage}
                                        alt={`Chapter Cover`}
                                        width={50}
                                        height={50}
                                        className="rounded-lg"
                                      />
                                      <div className="flex flex-col gap-1 w-full">
                                        <div className="flex flex-row w-full justify-between items-center">
                                          <span className="block text-white font-semibold">
                                            {chap?.chapterName}
                                          </span>
                                          <MdLock className="text-[#8E8E8E] w-4 h-4" />
                                        </div>
                                        <span className="block text-xs text-[#8E8E8E]">
                                          {convertUtcToGmtPlus7(
                                            chap?.publicTime
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </SheetTrigger>
                                  <SheetContent
                                    side={"bottom"}
                                    className="bg-[#2b2b2b]"
                                  >
                                    <SheetHeader>
                                      <SheetTitle className="text-white px-8">
                                        Mở khóa truyện để tiếp tục đọc nhé!
                                      </SheetTitle>
                                    </SheetHeader>
                                    <div className="flex flex-col gap-4">
                                      <div className=" px-8 flex flex-row justify-between items-center">
                                        <div className="flex flex-row gap-3 mt-3 items-center">
                                          <Image
                                            src={chap?.coverImage}
                                            alt="Comic Cover"
                                            width={120}
                                            height={120}
                                            className="rounded-lg"
                                          />
                                          <div className="flex flex-col gap-1">
                                            <span className="text-[#DA5EF0] font-semibold text-xl">
                                              {"kakaka"}
                                            </span>
                                            <span className="text-lg text-slate-400">
                                              {chap?.chapterName}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="flex flex-row gap-2 text-white font-semibold text-xl">
                                          {chap?.unlockPrice}
                                          <img
                                            src="/skycoin.png"
                                            width={30}
                                            height={30}
                                          />
                                        </div>
                                      </div>
                                      <Divider className="h-[0.8px] bg-[#686868] rounded-full" />
                                      <div className=" px-8 flex flex-row justify-between items-center">
                                        <div className="flex flex-row gap-2">
                                          <IoWalletOutline className="text-[#DA5EF0] w-6 h-6" />
                                          <span className="text-lg text-white">
                                            Bạn hiện đang có:
                                          </span>
                                        </div>
                                        <div className="flex flex-row gap-2 text-white font-semibold text-xl">
                                          {userCoins.toLocaleString("de-DE")}
                                          <img
                                            src="/skycoin.png"
                                            width={30}
                                            height={30}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <SheetFooter>
                                      <SheetClose asChild>
                                        {userId ? (
                                          <div className="flex flex-row gap-3 w-full mt-4 px-8">
                                            <Button
                                              className="basis-1/2 bg-transparent border-solid border-2 border-[#DA5EF0] text-[#DA5EF0] hover:bg-[#DA5EF0] hover:text-white"
                                              onClick={() => {
                                                router.push(
                                                  "https://anime-entertainment-payment.vercel.app/"
                                                );
                                              }}
                                            >
                                              Nạp thêm
                                            </Button>
                                            <Button
                                              className="basis-1/2 bg-gradient-to-r from-[#A958FE] to-[#DA5EF0] transition ease-in-out duration-300 hover:scale-[1.01]"
                                              onClick={() => {
                                                boughtInfo = {
                                                  chapterId: chap?._id,
                                                  unlockPrice:
                                                    chap?.unlockPrice,
                                                  chapterName:
                                                    chap?.chapterName,
                                                  coverImage: chap?.coverImage,
                                                };
                                                processBuyChapter();
                                                setModalMode("pay");
                                                onOpen();
                                              }}
                                            >
                                              Mua ngay
                                            </Button>
                                          </div>
                                        ) : (
                                          <Button
                                            className="mt-4 w-full px-8 mx-8 bg-gradient-to-r from-[#A958FE] to-[#DA5EF0] hover:scale-[1.01] transition ease-in-out duration-300"
                                            onClick={() => {
                                              router.push("/auth/login");
                                            }}
                                          >
                                            Đăng nhập để mua chương
                                          </Button>
                                        )}
                                      </SheetClose>
                                    </SheetFooter>
                                  </SheetContent>
                                </Sheet>
                              )}
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
          <>
            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
            {modalMode === "pay" ? (
              <ModalBody>
                {userCoins < boughtInfo?.unlockPrice || errorMessage ? (
                  <div className="text-white w-full h-full text-center flex flex-row gap-2 items-start">
                    <MdErrorOutline className="text-red-500 w-5 h-5" />
                    {errorMessage ||
                      "Số dư hiện tại không đủ, vui lòng nạp thêm"}
                  </div>
                ) : (
                  <div className="w-full h-full flex justify-center items-center">
                    {processPayment ? (
                      <Spinner
                        label="Đang xử lý giao dịch"
                        color="danger"
                        labelColor="danger"
                      />
                    ) : (
                      <div className="flex flex-col gap-3 w-full">
                        <div className="text-emerald-500 w-full h-full text-center flex flex-row gap-2 items-center">
                          <IoIosCheckmarkCircleOutline className="text-emerald-500 w-5 h-5" />
                          Mua chương truyện thành công
                        </div>
                        <Divider className="h-[0.8px] bg-[#686868] rounded-full" />
                        <div className="flex flex-col gap-1 justify-center w-full items-center">
                          <span className="text-[#A958FE] font-semibold text-base">
                            Cảm ơn bạn đã chọn Skylark
                          </span>
                          <span className="text-gray-300 font-medium text-sm">
                            Chúc bạn có một trải nghiệm vui vẻ
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </ModalBody>
            ) : (
              <ModalBody>
                <ChapterComment chapterId={chapterId} />
              </ModalBody>
            )}
            {modalMode === "pay" && <ModalFooter></ModalFooter>}
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default page;
